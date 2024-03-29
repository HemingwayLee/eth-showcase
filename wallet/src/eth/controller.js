const Web3 = require('web3');
const rs = require('randomstring');
const solc = require('solc');
const fs = require('fs');
const modelAddress = require("../db/address.model");
const modelSmartContract = require("../db/smartContract.model")
const modelTransaction = require("../db/transactions.model")
const modelDeployedSmartContract = require("../db/deployedSmartContract.model")

function _range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

function invokeAFunction(isCall, res, walletAddress, privatekey, contractAddress, abi, name, parameter) {
  const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  w3.eth.accounts.wallet.add(privatekey);
  let contract = new w3.eth.Contract(abi, contractAddress);
  let func = null;
  if (parameter && parameter != "") {
    func = contract.methods[name](parameter)
  } else {
    func = contract.methods[name]()
  }
  
  if (isCall) {
    callAFunction(func, res, walletAddress);
  } else {
    sendAFunction(func, res, walletAddress, w3);
  }
}

function callAFunction(func, res, walletAddress) {
  func.call({
    from: walletAddress
  }, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({isSucceeded: false, msg: err.message});
    } else {
      res.status(200).send({isSucceeded: true, result: result});
    }
  });
}

function sendAFunction(func, res, walletAddress, w3) {
  func.send({
    from: walletAddress,
    gas: 4000000
  }, function(err, transactionHash) {
    if (err) {
      console.log(err);
    } else {
      console.log("function", transactionHash);
    }
  })
  .on('transactionHash', function(hash) {
    console.log('transaction hash ', hash);
    w3.eth.getTransaction(hash, async function (err, data) {
      const ret = await modelTransaction.insertTransaction(data);
    });
  })
  .on('receipt', async function(receipt) {
    console.log('Transaction is mined');
    console.log(receipt)
    const ret1 = await modelTransaction.updateTransaction(receipt);
    if (ret1.isSucceeded) {
      const ret2 = await modelDeployedSmartContract.addDeployedSmartContract(
        abi, 
        bytecode, 
        receipt.contractAddress,
        receipt.transactionHash);
      if (ret2.isSucceeded) {
        res.status(200).send({ isSucceeded: true });
      } else {
        res.status(500).send(ret2);
      }
    } else {
      res.status(500).send(ret1);
    }
  })
  .on('confirmation', function(confirmationNum, receipt) {
    console.log('confirmation ', confirmationNum);
  })
  .catch((err) => {
    res.status(500).send({ isSucceeded: true, msg: err.message });
    return;
  });
}

exports.create = async (req, res) => {
  const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  const entropy = rs.generate(32);
  const account = w3.eth.accounts.create(entropy);

  let result = await modelAddress.insertAddress(account);
  if (result.isSucceeded) {
    res.status(200).send(account);
  } else {
    res.status(500).send(result);
  }
}

exports.getLatestTransactions = async (req, res) => {
  try {
    const { addresses } = req.body;
    const count = req.params.count;

    const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
    const w3 = new Web3(new Web3.providers.HttpProvider(url));

    const latest = await w3.eth.getBlockNumber()
    const blockNumbers = _range(latest - count, latest + 1, 1);
    const blocks = await Promise.all(blockNumbers.map(n => w3.eth.getBlock(n)));
    
    const ret = blocks.map(block => {
      return { 
        "number": block.number, 
        "timestamp": block.timestamp 
      } 
    });
    
    res.status(200).send({ isSucceeded: true });

  } catch (error) {
    console.log(error);
    res.status(500).send({ isSucceeded: false, msg: error.message });
  }
}

exports.getBalance = async (req, res) => {
  try {
    const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
    const w3 = new Web3(new Web3.providers.HttpProvider(url));

    const addr = req.params.addr;
    w3.eth.getBalance(addr, async function(err, balance) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        let result = await modelAddress.updateBalance(addr, balance);
        if (result.isSucceeded) {
          res.status(200).send({"balance": w3.utils.fromWei(balance, 'ether')});
        } else {
          res.status(500).send(result);
        } 
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ isSucceeded: false, msg: error.message });
  }
}

exports.addAccount = async (req, res) => {
  const { publickey, privatekey } = req.body;
  const account = {
    address: publickey,
    privateKey: privatekey
  };

  const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  let result = await modelAddress.insertAddress(account);
  if (result.isSucceeded) {
    res.status(200).send(account);
  } else {
    res.status(500).send(result);
  }
}

exports.invokeSmartContract = async (req, res) => {
  try {
    const { contractAddress, walletAddress, name, parameter } = req.body;
    // console.log(contractAddress)
    // console.log(walletAddress)
    // console.log(name)
    // console.log(`parameter: '${parameter}'`)
    const account = await modelAddress.getAccountById(walletAddress);
    let result = await modelDeployedSmartContract.getDeployedSmartContractByAddr(contractAddress);
    if (result.isSucceeded) {
      const abi = JSON.parse(result.theContract.abi);
      const theFunc = abi.filter(f => {
        return f.name == name
      });

      return invokeAFunction(theFunc[0].constant, res, walletAddress, account.theAccount.privateKey, contractAddress, abi, name, parameter);
    } else {
      res.status(500).send(result);
    }
  } catch (error) {
    res.status(500).send({ isSucceeded: false, msg: error.message });
  }
}

exports.deploySmartContract = async (req, res) => {
  try {
    const { addr, idx } = req.body;
    const account = await modelAddress.getAccountById(addr);
    
    const result = await modelSmartContract.getSmartContractById(idx);
    var input = {
      language: 'Solidity',
      sources: {
        [`${result.theContract.title}`]: {
          content: result.theContract.code
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
    };

    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    
    // TODO: consider other cases
    const contractName = Object.keys(output.contracts[`${result.theContract.title}`])[0];
    const abi = output.contracts[`${result.theContract.title}`][contractName].abi;
    const bytecode = output.contracts[`${result.theContract.title}`][contractName].evm.bytecode.object;

    const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
    const w3 = new Web3(new Web3.providers.HttpProvider(url));
    w3.eth.accounts.wallet.add(account.theAccount.privateKey);

    let contract = new w3.eth.Contract(abi);
    contract.deploy({
      data: bytecode
    })
    .send({
      from: account.theAccount.address,
      //21,000 at least
      gas: 3500000 
    })
    .on('transactionHash', function(hash) {
      console.log('transaction hash ', hash);
      w3.eth.getTransaction(hash, async function (err, data) {
        // when the network is slow, data might be null
        if (data) {
          const ret = await modelTransaction.insertTransaction(data);
        }
      });
    })
    .on('receipt', async function(receipt) {
      console.log('Transaction is mined');
      const ret1 = await modelTransaction.updateTransaction(receipt);
      if (ret1.isSucceeded) {
        const ret2 = await modelDeployedSmartContract.addDeployedSmartContract(
          abi, 
          bytecode, 
          receipt.contractAddress,
          receipt.transactionHash);
        if (ret2.isSucceeded) {
          res.status(200).send({ isSucceeded: true });
        } else {
          res.status(500).send(ret2);
        }
      } else {
        res.status(500).send(ret1);
      }
    })
    .on('confirmation', function(confirmationNum, receipt) {
      console.log('confirmation ', confirmationNum);
    })
    .then(function(newContractInstance) {
      console.log('then ', newContractInstance.options.address);
    })
    .catch((err) => {
      res.status(500).send({ isSucceeded: true, msg: err.message });
      return;
    });
  } catch (error) {
    res.status(500).send({ isSucceeded: false, msg: error.message });
  }
}


const Web3 = require('web3');
const rs = require('randomstring');
const solc = require('solc');
const modelAddress = require("../db/address.model");
const modelSmartContract = require("../db/smartContract.model")

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
};

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
      w3.eth.getTransactionReceipt(hash, function (err, data) {
        console.log("=== contract transaction ===")
        console.log(data);
        // if (err) {
        //   console.log(err);
        // } else {
        //   console.log(data);
        //   if (data.status == '0x0') {
        //     console.log("The trx execution was not successful, check your transaction !");
        //   } else {
        //     console.log("Execution worked fine!");
        //   }
        // }
      });
    })
    .on('receipt', function(receipt) {
      console.log('!!!! receipt !!!!!!');
      console.log(receipt)
      console.log('!!!! receipt !!!!!!');
      res.status(200).send({ isSucceeded: true });
    })
    .on('confirmation', function(confirmationNum, receipt) {
      console.log('confirmation ', confirmationNum);
    })
    .then(function(newContractInstance) {
      console.log('then ', newContractInstance.options.address);
    })
    .catch((err) => {
      console.log("!!!!!! then error");
      res.status(500).send({ isSucceeded: true, msg: error.message });
      return;
    });

    // let result = await modelAddress.insertAddress(account);
    // if (result.isSucceeded) {
    //   res.status(200).send(account);
    // } else {
    //   res.status(500).send(result);
    // }
  } catch (error) {
    console.log("catch!!!!!!!")
    // console.log(error);
    res.status(500).send({ isSucceeded: false, msg: error.message });
  }
}


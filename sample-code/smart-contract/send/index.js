const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  const abi = JSON.parse(fs.readFileSync('abi_v080.json', 'utf8'));
  // const contractAddr = "0x1a4e87768D1f2afBd8912Bcee9D58c929265d8fa";
  const contractAddr = '0xB62242f54E11f9B14DB9f0c3E62565E3D67f6dC2';  

  w3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  let contract = new w3.eth.Contract(abi, contractAddr);
  
  //call and send
  // send need to alter the status in SC, so we need to pay ETH

  // it works
  // contract.methods.set(5566).send({
  //   from: process.env.PUBLIC_KEY,
  //   gas: 3500000
  // }, function(err, transactionHash) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("function", transactionHash);
  //   }
  // })
  // .on('error', function(error) {
  //   console.log("error", error);
  // })
  // .on('transactionHash', function(transactionHash) {
  //   console.log("transactionHash", transactionHash);
  // })
  // .on('receipt', function(receipt) {
  //   console.log("status", receipt.status);
  //   console.log("receipt", receipt.status);
  // })
  // .on('confirmation', function(confirmationNum, recepit) {
  //   console.log("confirmation", confirmationNum);
  // });

  // it is okay if the 183 is a string, not int
  contract.methods["set"]("183").send({
    from: process.env.PUBLIC_KEY,
    gas: 3500000
  }, function(err, transactionHash) {
    if (err) {
      console.log(err);
    } else {
      console.log("function", transactionHash);
    }
  })
  .on('transactionHash', function(hash) {
    console.log('transaction hash ', hash);
  })
  .on('receipt', async function(receipt) {
    console.log('Transaction is mined');
    console.log(receipt)
  })
  .on('confirmation', function(confirmationNum, receipt) {
    console.log('confirmation ', confirmationNum);
  })
  .catch((err) => {
    res.status(500).send({ isSucceeded: true, msg: error.message });
    return;
  });
}

main();

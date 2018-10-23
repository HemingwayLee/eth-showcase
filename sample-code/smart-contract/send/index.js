const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/' + process.env.API_KEY;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  const abi = JSON.parse(fs.readFileSync('abi.json', 'utf8'));
  const contractAddr = "0xE0B60FADEe5CB82A8f55ddb7c23fBE06e9EDF1A7";
  
  w3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

  let contract = new w3.eth.Contract(abi, contractAddr);
  
  //call and send
  // send need to alter the status in SC, so we need to pay ETH
  contract.methods.set(5566).send({
    from: process.env.PUBLIC_KEY,
    gas: 3500000
  }, function(err, transactionHash) {
    if (err) {
      console.log(err);
    } else {
      console.log("function", transactionHash);
    }
  })
  .on('error', function(error) {
    console.log("error", error);
  })
  .on('transactionHash', function(transactionHash) {
    console.log("transactionHash", transactionHash);
  })
  .on('receipt', function(receipt) {
    console.log("status", receipt.status);
    console.log("receipt", receipt.status);
  })
  .on('confirmation', function(confirmationNum, recepit) {
    console.log("confirmation", confirmationNum);
  });
}

main();

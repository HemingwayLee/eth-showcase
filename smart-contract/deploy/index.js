const fs = require('fs');
const Web3 = require('web3');
const w3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/M1QDKJ5S7583XBFF813PTT2C6X5QHN9ANQ'));

require('dotenv').config();

async function main() {
  const bytecode = process.env.BYTECODE;
  const abi = JSON.parse(fs.readFileSync('abi.json', 'utf8'));

  w3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

  let contract = new w3.eth.Contract(abi);
  contract.deploy({
    data: bytecode
  })
  .send({
    from: process.env.PUBLIC_KEY,
    gas: 3500000
  })
  .on('error', function(error) {
    console.log('error ', error);
  })
  .on('transactionHash', function(hash) {
    console.log('transaction hash ', hash);
  })
  .on('receipt', function(receipt) {
    console.log('receipt ', receipt.contractAddress);
  })
  .on('confirmation', function(confirmationNum, receipt) {
    console.log('confirmation ', confirmationNum);
  })
  .then(function(newContractInstance) {
    console.log(newContractInstance.options.address);
  });
}

main();

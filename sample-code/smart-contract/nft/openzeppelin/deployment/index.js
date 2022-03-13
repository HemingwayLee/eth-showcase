const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  const bytecode = `0x${fs.readFileSync('LeeYunWei.bin', 'utf8')}`;
  const abi = JSON.parse(fs.readFileSync('LeeYunWei.abi', 'utf8'));

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

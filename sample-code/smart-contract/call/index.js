const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/' + process.env.API_KEY;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  const abi = JSON.parse(fs.readFileSync('abi.json', 'utf8'));

  const contractAddr = "0xE0B60FADEe5CB82A8f55ddb7c23fBE06e9EDF1A7";
  let contract = new w3.eth.Contract(abi, contractAddr);
  
  //call and send
  // call don't need to alter the status in SC, so we don't need to pay ETH
  contract.methods.get().call({
    from: process.env.PUBLIC_KEY
  }, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("The result is", res);
    }
  });
}

main();

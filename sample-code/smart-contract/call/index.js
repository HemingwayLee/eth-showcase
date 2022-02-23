const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  const abi = JSON.parse(fs.readFileSync('abi.json', 'utf8'));

  const contractAddr = "0x1a4e87768D1f2afBd8912Bcee9D58c929265d8fa";
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

const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/' + process.env.API_KEY;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  const contractAddr = "0xE0B60FADEe5CB82A8f55ddb7c23fBE06e9EDF1A7";
  [contractAddr, process.env.PUBLIC_KEY].forEach(
    function(addr) {
      
    console.log("address", addr);

    w3.eth.getCode(addr, function(error, result) {
      if (error) {
        console.log("error", error);
      } else {
        console.log("result", result);
      }
    });
  });
}

main();
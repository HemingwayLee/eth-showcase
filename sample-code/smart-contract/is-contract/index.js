const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  // const w3 = new Web3("https://cloudflare-eth.com")  

  const contractAddr = "0x1a4e87768D1f2afBd8912Bcee9D58c929265d8fa";
  [contractAddr, process.env.PUBLIC_KEY].forEach(
    function(addr) {
      w3.eth.getCode(addr, function(error, result) {
        console.log("address", addr);
        if (error) {
          console.log("error", error);
        } else {
          console.log("result", result);
        }
      });
  });
}

main();

const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  // const w3 = new Web3("https://cloudflare-eth.com")  
  // const w3 = new Web3("http://localhost:8545");

  w3.eth.getBlockNumber().then(console.log);
  console.log(await w3.eth.getBlockNumber());

  w3.eth.getBalance(process.env.PUBLIC_KEY).then(console.log);
  // w3.eth.getBalance('0x0000000000000000000000000000000000000001').then(console.log);
  w3.eth.getBalance(process.env.PUBLIC_KEY, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res)
    }
  });

  w3.eth.getBlock(4210587).then(console.log);

  // console.log(process.env.PRIVATE_KEY);
}

main();


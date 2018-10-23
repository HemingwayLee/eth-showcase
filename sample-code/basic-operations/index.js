const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/' + process.env.API_KEY;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  w3.eth.getBlockNumber().then(console.log);
  console.log(await w3.eth.getBlockNumber());

  w3.eth.getBalance(process.env.PUBLIC_KEY).then(console.log);
  w3.eth.getBalance(process.env.PUBLIC_KEY, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res)
    }
  });

  w3.eth.getBlock(4210587).then(console.log);

  console.log(process.env.PRIVATE_KEY);
}

main();
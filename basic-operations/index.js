const Web3 = require('web3');
const w3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/M1QDKJ5S7583XBFF813PTT2C6X5QHN9ANQ'));

require('dotenv').config();

async function main() {
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
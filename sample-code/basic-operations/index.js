const Web3 = require('web3');

require('dotenv').config();

async function main() {
  // console.log(process.env.PRIVATE_KEY);

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

  // Get block info
  // w3.eth.getBlock(4210587).then(console.log);

  // transactions
  w3.eth.getTransactionReceipt("0xe8329960b71fbaf3947cd2195f56630b60f857b8f5fd99e653d1f71e19f06a47", function (err, data) {
    console.log("=== contract transaction ===")
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      if (data.status == '0x0') {
        console.log("The trx execution was not successful, check your transaction !");
      } else {
        console.log("Execution worked fine!");
      }
    }
  });

  w3.eth.getTransactionReceipt("0x83f8f471ba30fe16fc09b318af48c851ec735cd4f3ba662c54e57528b7943256", function (err, data) {
    console.log("=== send/receive transaction ===")
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  w3.eth.getTransactionReceipt("0x1642ce29761718f5baa91fdd9778f2233e43b147eb1936924d514b31b00a4c87", function (err, data) {
    console.log("=== (set a value) transaction ===")
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  
}

main();


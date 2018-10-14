const Web3 = require('web3');
const w3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/M1QDKJ5S7583XBFF813PTT2C6X5QHN9ANQ'));

require('dotenv').config();

async function main() {
  const account = w3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  const address = account.address;
  w3.eth.getBalance(address, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res)
    }
  });
}

main();
const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  const account = w3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  const address = account.address;
  w3.eth.getBalance(address, function(err, res) {
    if (!err) {
      var balance = w3.utils.fromWei(res, 'ether');
      console.log('address: ', address);
      console.log('ETH: ', balance);
    }
  });
}

main();

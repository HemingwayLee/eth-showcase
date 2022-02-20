const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  // const w3 = new Web3("https://cloudflare-eth.com")  

  w3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  w3.eth.sendTransaction({
    from: process.env.PUBLIC_KEY, 
    to: '0x55a4C9Fa84fDC073aaf92c2A2912aaFF2A5c77b8', 
    value: w3.utils.toWei('1', 'ether'), 
    gasLimit: 21000, 
    gasPrice: 20000000000
  }, function (err, transactionHash) {
    if (err) { 
      console.log('err', err); 
    } else {
      console.log('transactionHash', transactionHash);
    }
  });
}

main();

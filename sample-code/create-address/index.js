const fs = require('fs');
const Web3 = require('web3');
const rs = require('randomstring');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  // const w3 = new Web3("https://cloudflare-eth.com")  

  let entropy = rs.generate(32);
  const account = w3.eth.accounts.create(entropy);

  const filename = entropy + '.json';
  fs.writeFile(filename, JSON.stringify(account), function(err) {
    if (err) {
      console.log(err);
    }

    console.log("The account was saved into file ", filename);
  });
}

main();

const fs = require('fs');
const Web3 = require('web3');
const w3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/M1QDKJ5S7583XBFF813PTT2C6X5QHN9ANQ'));
const rs = require('randomstring');

async function main() {
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
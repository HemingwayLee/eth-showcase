const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

async function main() {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  const abi = JSON.parse(fs.readFileSync('LeeYunWei.abi', 'utf8'));
  const contractAddr = "0x1828e0ffc058b961b8d06686bcbd4582826087ae";
  
  w3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

  let contract = new w3.eth.Contract(abi, contractAddr);
  
  //call and send
  // send need to alter the status in SC, so we need to pay ETH
  contract.methods.balanceOf(process.env.PUBLIC_KEY).call({
    from: process.env.PUBLIC_KEY
  }, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("The result of balanceOf is ", res);
    }
  });

  contract.methods.ownerOf(2).call({
    from: process.env.PUBLIC_KEY
  }, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("The result of ownerOf(2) is ", res);
    }
  })

  contract.methods.tokenURI(3).call({
    from: process.env.PUBLIC_KEY
  }, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("The result of tokenURI(3) is ", res);
    }
  })

  contract.methods.name().call({
    from: process.env.PUBLIC_KEY
  }, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("The result of name() is ", res);
    }
  })

  contract.methods.symbol().call({
    from: process.env.PUBLIC_KEY
  }, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("The result of symbol() is ", res);
    }
  })
}

main();

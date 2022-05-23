const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

async function mint(img) {
  const url = 'https://ropsten.infura.io/v3/' + process.env.PROJECT_ID;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  const abi = JSON.parse(fs.readFileSync('LeeYunWei2.abi', 'utf8'));
  // This is ERC-721 extension
  const contractAddr = "0x0d509954fd1044ff7c3568e2be579B409b7122f5"
  // const contractAddr = "0x1828e0ffc058b961b8d06686bcbd4582826087ae";
  
  w3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

  let contract = new w3.eth.Contract(abi, contractAddr);
  
  //call and send
  // send need to alter the status in SC, so we need to pay ETH
  contract.methods.mintNFT(process.env.PUBLIC_KEY, img).send({
    from: process.env.PUBLIC_KEY,
    gas: 5500000
  }, function(err, transactionHash) {
    if (err) {
      console.log(err);
    } else {
      console.log("function", transactionHash);
    }
  })
  .on('error', function(error) {
    console.log("error", error);
  })
  .on('transactionHash', function(transactionHash) {
    console.log("transactionHash", transactionHash);
  })
  .on('receipt', function(receipt) {
    console.log("status", receipt.status);
    console.log("receipt", receipt.status);
  })
  .on('confirmation', function(confirmationNum, recepit) {
    console.log("confirmation", confirmationNum);
  });
}

mint("https://raw.githubusercontent.com/HemingwayLee/eth-nft-showcase/main/metadata/LeeYunWei4.metadata.json");

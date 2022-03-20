const Web3 = require('web3');
const rs = require('randomstring');

exports.create = async (req, res) => {
  console.log(Date.now())

  const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));
  
  const entropy = rs.generate(32);
  const account = w3.eth.accounts.create(entropy);

  res.status(200).send(account);
}

exports.send = async (req, res) => {
  res.status(200).send("Hello, Send");
}

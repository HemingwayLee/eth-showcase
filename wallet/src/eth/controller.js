const Web3 = require('web3');
const rs = require('randomstring');

const modelAddress = require("../db/address.model")

exports.create = async (req, res) => {
  const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  const entropy = rs.generate(32);
  const account = w3.eth.accounts.create(entropy);

  let result = await modelAddress.insertAddress(account);
  if (result.isSucceeded) {
    res.status(200).send(account);
  } else {
    res.status(500).send(result);
  }
}

exports.getBalance = async (req, res) => {
  const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  const addr = req.params.addr;
  w3.eth.getBalance(addr, async function(err, balance) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      let result = await modelAddress.updateBalance(addr, balance);
      if (result.isSucceeded) {
        res.status(200).send({"balance": w3.utils.fromWei(balance, 'ether')});
      } else {
        res.status(500).send(result);
      } 
    }
  });
}

exports.addAccount = async (req, res) => {
  const { publickey, privatekey } = req.body;
  const account = {
    address: publickey,
    privateKey: privatekey
  };

  const url = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
  const w3 = new Web3(new Web3.providers.HttpProvider(url));

  let result = await modelAddress.insertAddress(account);
  if (result.isSucceeded) {
    res.status(200).send(account);
  } else {
    res.status(500).send(result);
  }
}


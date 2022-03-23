const addressModel = require("./address.model")
const smartContractModel = require("./smartContract.model")
const transactionModel = require("./transactions.model")
const deployedSmartContractModel = require("./deployedSmartContract.model")

exports.getAllAddress = async (req, res) => {
  const result = await addressModel.getAllAddress();
  if (result.isSucceeded) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
}

exports.addSmartContract = async (req, res) => {
  const { title, code } = req.body;
  const result = await smartContractModel.addSmartContract(title, code);
  if (result.isSucceeded) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
}

exports.getAllSmartContract = async (req, res) => {
  const result = await smartContractModel.getAllSmartContract();
  if (result.isSucceeded) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
}

exports.getAllDeployedSmartContract = async (req, res) => {
  const result = await deployedSmartContractModel.getAllDeployedSmartContract();
  if (result.isSucceeded) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
}

exports.getAllTransaction = async (req, res) => {
  const result = await transactionModel.getAllTransactions();
  if (result.isSucceeded) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
}



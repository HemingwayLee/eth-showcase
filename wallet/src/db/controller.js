const addressModel = require("./address.model")
const categoryModel = require("./smartContract.model")

exports.getAllAddress = async (req, res) => {
  const result = await addressModel.getAllAddress();
  if (result.isSucceeded) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
}

exports.saveSmartContract = async (req, res) => {
  
}

exports.getAllSmartContract = async (req, res) => {
  // const result = await addressModel.getAllAddress();
  // if (result.isSucceeded) {
  //   res.status(200).send(result);
  // } else {
  //   res.status(500).send(result);
  // }
}

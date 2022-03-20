const addressModel = require("./address.model")
// const categoryModel = require("./category.model")

exports.getAllAddress = async (req, res) => {
  const result = await addressModel.getAllAddress();
  if (result.isSucceeded) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
}

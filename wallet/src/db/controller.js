const categoryModel = require("./category.model")

exports.insertData = async (req, res) => {
  const result = await categoryModel.insertData(req.params.name);
  res.status(200).send(result);
}

exports.getAll = async (req, res) => {
  const result = await categoryModel.getAll();
  res.status(200).send(result);
}


exports.create = async (req, res) => {
  res.status(200).send("Hello, Create");
}

exports.send = async (req, res) => {
  res.status(200).send("Hello, Send");
}

module.exports = {
  name: "SmartContract",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    code: {
      type: "text"
    },
    createdAt: {
      type: "float"
    }
  }
}

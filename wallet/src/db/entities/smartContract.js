module.exports = {
  name: "SmartContract",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    title: {
      type: "varchar"
    },
    code: {
      type: "text"
    },
    createdAt: {
      type: "float"
    }
  }
}

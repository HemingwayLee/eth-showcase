module.exports = {
  name: "Addresses",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    address: {
      type: "varchar"
    },
    privateKey: {
      type: "varchar"
    },
    createdAt: {
      type: "float"
    },
  }
}

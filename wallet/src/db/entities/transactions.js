module.exports = {
  name: "Transactions",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    hash: {
      type: "varchar"
    },
    status: {
      type: "boolean"
    },
    type: {
      type: "varchar"
    },
    address: {
      type: "varchar"
    },
    createdAt: {
      type: "float"
    }
  }
}
  
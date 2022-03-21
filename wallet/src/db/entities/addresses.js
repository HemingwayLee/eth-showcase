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
    balance: {
      type: "float",
      default: 0
    },
    gotBalanceAt: {
      type: "float",
      default: 0
    }
  }
}

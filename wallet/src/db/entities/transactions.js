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
      type: "boolean",
      default: false
    },
    type: {
      type: "varchar",
      default: null
    },
    from: {
      type: "varchar"
    },
    to: {
      type: "varchar",
      default: null
    },
    mined: {
      type: "boolean",
      default: false
    },
    createdAt: {
      type: "float"
    }
  }
}
  
module.exports = {
  name: "DeployedSmartContract",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    abi: {
      type: "text"
    },
    bytecode: {
      type: "text"
    },
    address: {
      type: "varchar"
    },
    creator: {
      type: "int"
    },
    deployedAt: {
      type: "float"
    }
  },
  relations: {
    deployedContracts: {
      target: "Addresses",
      type: "many-to-one",
      joinColumn: {
        name: "creator"
      }
    }
  }
}

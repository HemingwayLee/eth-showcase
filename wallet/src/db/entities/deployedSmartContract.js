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
    transaction: {
      type: "varchar"
    },
    deployedAt: {
      type: "float"
    }
  }
  // TODO: worry about relation in the future
  // relations: {
  //   deployedContracts: {
  //     target: "Addresses",
  //     type: "many-to-one",
  //     joinColumn: {
  //       name: "creator"
  //     }
  //   }
  // }
}

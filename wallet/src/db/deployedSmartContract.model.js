const orm = require("./db.config")

exports.addDeployedSmartContract = async (abi, bytecode, address, hash) => {
  let result = { isSucceeded: true };

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("DeployedSmartContract");
    await repo.save({
      abi: JSON.stringify(abi),
      address: address,
      transaction: hash,
      bytecode: bytecode,
      deployedAt: Date.now()
    });
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.getAllDeployedSmartContract = async () => {
  let result = { isSucceeded: true, smartContracts: [] };
  
  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("DeployedSmartContract");
    result.smartContracts = await repo.find();
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.getDeployedSmartContractByAddr = async (addr) => {
  let result = { isSucceeded: true, theContract: null };
  
  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("DeployedSmartContract");
    result.theContract = await repo.findOne(
      { 
        where: { address: addr }
      }
    );
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

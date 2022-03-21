const orm = require("./db.config")

exports.addSmartContract = async code => {
  let result = { isSucceeded: true };

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("SmartContract");
    await repo.save({
      code: code,
      createdAt: Date.now()
    });
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.getAllSmartContract = async () => {
  let result = { isSucceeded: true, smartContracts: [] };
  
  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("SmartContract");
    result.smartContracts = await repo.find();
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}


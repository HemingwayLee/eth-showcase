const orm = require("./db.config")

exports.addSmartContract = async (title, code) => {
  let result = { isSucceeded: true };

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("SmartContract");
    await repo.save({
      title: title,
      code: code,
      createdAt: Date.now()
    });
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.getSmartContractById = async id => {
  let result = { isSucceeded: true, theContract: null };

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("SmartContract");
    result.theContract = await repo.findOne(
      { 
        where: { id: id }
      }
    );
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


const orm = require("./db.config")

exports.insertAddress = async account => {
  let result = { isSucceeded: true };

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Transactions");
    await repo.save({
      address: account.address,
      privateKey: account.privateKey,
      createdAt: Date.now()
    });
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.updateBalance = async (address, balance) => {
  let result = { isSucceeded: true };

//   await orm.conn.then(async conn => {
//     const repo = await conn.getRepository("Transactions");
//     await repo.update( 
//       { address: address },
//       {
//         balance: balance,
//         gotBalanceAt: Date.now()
//       }
//     );
//   }).catch(error => {
//     result = { isSucceeded: false, msg: error.message }
//     console.log(error);
//   });

  return result;
}

exports.getAllAddress = async () => {
  let result = { isSucceeded: true, addresses: [] };
  
  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Addresses");
    result.addresses = await repo.find();
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.getAccountById = async (addr) => {
  let result = { isSucceeded: true, addresses: [] };
  
  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Addresses");
    result.theAccount = await repo.findOne(
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

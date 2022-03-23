const orm = require("./db.config")

exports.insertTransaction = async data => {
  let result = { isSucceeded: true };

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Transactions");
    await repo.save({
      hash: data.hash,
      from: data.from,
      type: data.type,
      createdAt: Date.now()
    });
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.updateTransaction = async (data) => {
  let result = { isSucceeded: true };

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Transactions");
    await repo.update( 
      { hash: data.transactionHash },
      {
        status: data.status,
        to: data.contractAddress,
        mined: true
      }
    );
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

exports.getAllTransactions = async () => {
  let result = { isSucceeded: true, transactions: [] };
  
  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Transactions");
    result.transactions = await repo.find();
  }).catch(error => {
    result = { isSucceeded: false, msg: error.message }
    console.log(error);
  });

  return result;
}

// exports.getAccountById = async (addr) => {
//   let result = { isSucceeded: true, addresses: [] };
  
//   await orm.conn.then(async conn => {
//     const repo = await conn.getRepository("Addresses");
//     result.theAccount = await repo.findOne(
//       { 
//         where: { address: addr }
//       }
//     );
//   }).catch(error => {
//     result = { isSucceeded: false, msg: error.message }
//     console.log(error);
//   });

//   return result;
// }

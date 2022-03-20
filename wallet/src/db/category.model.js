const orm = require("./db.config")

exports.insertData = async aName => {
  let result = [];

  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Category");
    result = await repo.save({
      name: aName
    });
  }).catch(error => {
    console.log(error);
  });

  return result;
}

exports.getAll = async () => {
  let result = [];
  
  await orm.conn.then(async conn => {
    const repo = await conn.getRepository("Category");
    result = await repo.find();
  }).catch(error => {
    console.log(error);
  });

  return result;
}


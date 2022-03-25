const fs = require('fs');

exports.getAccountsFromEnv = () => {
  const publicKeys = process.env.PUBLIC_KEY.split(",");
  const privateKeys = process.env.PRIVATE_KEY.split(",");

  if (!publicKeys || !privateKeys || publicKeys.length !== privateKeys.length) {
    console.log("no proper account detected in .env file")
    return [];
  }
  
  const accounts = publicKeys.map((ele, idx) => {
    return { 
      address: ele,
      privateKey: privateKeys[idx],
      createdAt: Date.now()
    }
  });

  return accounts;
}

exports.getExistingSolidityCodeFromDisk = () => {
  const dirname = "./src/contracts/";
  const filenames = fs.readdirSync(dirname);
  const solFiles = filenames.filter(f => f.includes('.sol'));
  let ret = {
    solEntries: [],
    scEntries: []
  };
  solFiles.forEach(function(filename) {
    console.log(filename)

    const content = fs.readFileSync(dirname + filename, 'utf-8');
    ret.solEntries.push({ 
      title: filename,
      code: content,
      createdAt: Date.now()
    });
  });

  return ret;
}

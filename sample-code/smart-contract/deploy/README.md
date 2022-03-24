# How to run
* locally
```
npm install .
node index.js
```

* with docker
```
docker build -t myeth .
docker run -it --rm myeth
```

# Note
* Only `bytecode` is deployed onto the blockchain
  * `abi` is only for verification, it is not mandatory
  * We can download other people's `bytecode` and re-deploy, but we don't know the `abi` to interact with it
* `abi` can be recovered from `bytecode`, but it is not 100%

## Is function 
* If `"constant":true` then the function is a call
  * A call is a read only function
  * It doesn't alter the blockchain 
  * You can call it without spending gas
  * It won't be mined and it is executed locally on your node only
  * It is fast and cheap

* If `"constant":false` it is a transaction

# Ref
* [How to deploy a bytecode-only contract without an ABI](https://ethereum.stackexchange.com/questions/117777/how-to-deploy-a-bytecode-only-contract-without-an-abi)
* [Is there a way to extract ABI from a deployed contract?](https://ethereum.stackexchange.com/questions/37931/is-there-a-way-to-extract-abi-from-a-deployed-contract)
* [web3.js can I call a smart contract function without knowing the ABI?](https://ethereum.stackexchange.com/questions/31481/web3-js-can-i-call-a-smart-contract-function-without-knowing-the-abi)


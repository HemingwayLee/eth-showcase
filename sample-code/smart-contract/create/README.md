# Install solidity
* in Mac using brew
```
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
```

* using docker
```
docker pull ethereum/solc:stable
docker run -v ${PWD}:/sources ethereum/solc:stable -o /sources/output --abi --bin /sources/myxxxxx.sol
```

* using `solcjs`
```
npm install solc@0.8.0
```

# Compile into bytecode and ABI

```
solc --bin hello.sol > hello.bin
solc --abi hello.sol > hello.abi
```

## Why solidity
* Fit into EVM
* Small
* Security


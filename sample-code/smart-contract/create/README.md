# Install solidity

```
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
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


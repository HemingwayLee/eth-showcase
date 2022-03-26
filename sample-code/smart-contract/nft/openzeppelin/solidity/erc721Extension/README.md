# TODO
* not finished yet

# Use solidity compiler with docker
* Pull docker image
```
docker pull ethereum/solc:stable
```

* install openzeppelin related packages
```
npm install @openzeppelin/contracts
```

# Compile into bytecode and ABI

```
docker run -v ${PWD}:/sources ethereum/solc:stable -o /sources/output --abi --bin /sources/my2ndnft.sol
```



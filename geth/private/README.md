# prerequisite
* we can use `geth` to run mainnet, testnet, and private net
* in order to run it privately, we need to provide `genesis.json`
* `config.chainId` is introduced by [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md), `1` is mainnet


# Run single node
* set it up
```
docker-compose -f docker-compose.single.yml up
```

* test
```
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' http://localhost:8545
```

# Run multiple node


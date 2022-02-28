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

# Run member node
* set it up
```
docker-compose -f docker-compose.mutiple.yml up
```

* test with `net_peerCount` method, it will return `0x1` (it returns `0x0` for docker-compose.single.yml)
```
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":67}' http://localhost:8545
```

# TODO:
* add GUI
* add miner
* add pow


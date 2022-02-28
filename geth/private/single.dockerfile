FROM ethereum/client-go:alltools-latest
# `ethereum/client-go:alltools-latest` has `bootnode` command line tool

COPY ./config/genesis.json /tmp
RUN mkdir -p /tmp/data

RUN geth --datadir /tmp/data init /tmp/genesis.json

WORKDIR /tmp
RUN bootnode --genkey=boot.key

# ENTRYPOINT /bin/sh


FROM node:14

RUN apt-get update && apt-get install -y net-tools

RUN mkdir -p /home/app/
COPY . /home/app/
WORKDIR /home/app/

RUN npm install .

ENTRYPOINT /home/app/runner.sh && /bin/bash


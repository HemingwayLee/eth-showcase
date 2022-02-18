#!/bin/bash

echo "get environment variables from .env..."
# if [ ! -f .env ]
# then
#   export $(cat .env | xargs)
# fi 

# wont work if you have # in your .env
source .env

echo "environment variables:"
echo ${PUBLIC_KEY}
echo ${PRIVATE_KEY}
echo ${PROJECT_ID}

npm start


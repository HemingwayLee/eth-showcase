#!/bin/bash

until PGPASSWORD=${DB_PASS} psql -h ${DB_HOST} -p ${DB_PORT} -U postgres -c "\q"; do
  >&2 echo "Postgres is not available, sleep..."
  sleep 1
done

echo "psql is up !!"

pwd
ls

npm start


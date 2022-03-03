FROM node:14
RUN apt-get update && apt-get install -y nginx

RUN mkdir -p /root/expedition
WORKDIR /root/expedition

COPY . .
RUN npm install

RUN REACT_APP_ETH_RPC_URL=http://127.0.0.1:8545 npm run build

RUN cp -R /root/expedition/build/* /var/www/html
RUN rm /var/www/html/index.nginx-debian.html
RUN rm -fr /root/expedition/*

WORKDIR /var/www/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


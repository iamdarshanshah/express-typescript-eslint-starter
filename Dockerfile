FROM node:12-alpine as build

RUN mkdir -p /usr/build/ts-starter

COPY ./package.json /usr/build/ts-starter

WORKDIR /usr/build/ts-starter

RUN yarn

COPY . /usr/build/ts-starter

RUN yarn build

RUN ls -lt

CMD ["node", "/usr/build/ts-starter/build/server.js"]


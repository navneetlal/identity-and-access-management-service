FROM node:14.15-alpine as build

WORKDIR /app

COPY package*.json ./

ENV NPM_CONFIG_LOGLEVEL warn

RUN yarn
COPY . .
RUN yarn build

FROM node:14.15-alpine as runtime

WORKDIR /app

COPY --from=build /app/dist /app
COPY package*.json ./

ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn --production

EXPOSE 3000

ENV NODE_ENV production

CMD [ "node", "server.js" ]
FROM node:latest as builder
COPY . /app
WORKDIR /app
RUN npm i prettier -g
RUN npm i && npm run build
EXPOSE 5001
CMD [ "node", "build/server.js" ]
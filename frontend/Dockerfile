FROM node:lts-alpine

ENV HOST=0.0.0.0

# install simple http server for serving static content
RUN npm install -g http-server

WORKDIR /home/app

COPY package*.json /home/app/

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "http-server", "dist" ]
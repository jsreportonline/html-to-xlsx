FROM ubuntu:artful
MAINTAINER Jan Blaha
EXPOSE 7000

RUN apt-get update && apt-get install -y curl sudo bzip2 && \
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
    apt-get install -y nodejs libfontconfig1 libfontconfig1-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production

COPY . /usr/src/app

COPY patch /usr/src/app

HEALTHCHECK CMD curl --fail http://localhost:7000 || exit 1

CMD [ "node", "index.js" ]
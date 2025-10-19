FROM node:24.10.0-alpine3.22

#using globally package store on local computer
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

COPY package.json .

#install neccary packages and use pnpm version from engines object in package.json
RUN apt-get update -y && apt-get install -y jq openssl
RUN PNPM_VERSION=$(jq -r '.engines.pnpm' package.json) && npm install -g pnpm@$PNPM_VERSION

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]

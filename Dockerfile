FROM node:22.8.0-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN apt-get update -y && apt-get install -y openssl

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]

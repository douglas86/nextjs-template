FROM node:22.4.0-alpine3.20 AS base

#This is to use pnpm from your local machine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
#corepack is for enabling symlink as it is experimental
RUN corepack enable

WORKDIR /app

COPY package*.json .
RUN pnpm install

COPY . .
RUN pnpm install prisma --save-dev
RUN npx prisma generate
RUN pnpm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && pnpm run dev"]

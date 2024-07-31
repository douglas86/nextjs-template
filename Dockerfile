FROM node:22.4.0-alpine3.20 AS base

#This is to use pnpm from your local machine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
#corepack is for enabling symlink as it is experimental
RUN corepack enable

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install || cat /root/.pnpm-debug.log

COPY . .

RUN pnpm add prisma --save-dev || cat /root/.pnpm-debug.log
RUN npx prisma generate || cat /root/.pnpm-debug.log

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && pnpm run dev"]

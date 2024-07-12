FROM node:22.4-alpine3.19

WORKDIR /app

COPY package.json .
COPY prisma ./prisma/

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
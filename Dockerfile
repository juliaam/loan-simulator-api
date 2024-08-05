FROM node:20.12.2

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./

RUN npm install -g pnpm@8

COPY . .

RUN pnpm install

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]




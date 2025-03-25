FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY scripts ./scripts
COPY src ./src

RUN npm install

RUN npm run index
RUN npx prisma generate
RUN npm run build

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts

COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

COPY wait-for.sh ./wait-for.sh
RUN chmod +x ./wait-for.sh

ENV NODE_ENV=production
ENV SERVER_PORT=3000

CMD ["./wait-for.sh", "db:3306", "sh", "-c", "npx prisma migrate deploy && node dist/server.js"]


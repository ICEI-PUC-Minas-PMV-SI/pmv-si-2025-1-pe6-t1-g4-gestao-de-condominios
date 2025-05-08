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

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

COPY wait-for.sh ./wait-for.sh
ARG HOST_OS
RUN if [ "$HOST_OS" = "windows" ]; then apt update && apt install -y dos2unix; fi
RUN if [ "$HOST_OS" = "windows" ]; then dos2unix wait-for.sh; fi
RUN chmod +x ./wait-for.sh

ENV NODE_ENV=production
ENV SERVER_PORT=3000

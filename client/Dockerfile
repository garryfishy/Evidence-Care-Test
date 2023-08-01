FROM node:20-alpine AS deps
WORKDIR /client
COPY package*.json .
RUN npm i

FROM node:20-alpine AS builder
WORKDIR /client
COPY --from=deps /client/node_modules ./node_modules
COPY src ./src
COPY public ./public
COPY package.json next.config.js ./
RUN npm run build

FROM node:20-alpine
WORKDIR /client
COPY --from=builder /client/.next ./.next
COPY --from=builder /client/public ./public
COPY --from=builder /client/node_modules ./node_modules
COPY --from=builder /client/package.json ./
CMD ["npm", "run", "start"]
# Etapa de build
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa de producción
FROM node:20-alpine AS runner

WORKDIR /app

# Solo copia lo necesario
COPY --from=builder /app/dist ./dist

EXPOSE 4321

CMD ["npx", "serve", "./dist"]

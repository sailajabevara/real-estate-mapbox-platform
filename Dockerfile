# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine

WORKDIR /app

# Install serve to host build
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3006

CMD ["serve", "-s", "dist", "-l", "3006"]

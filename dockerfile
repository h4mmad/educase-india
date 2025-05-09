# ---------- build ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build          # tsc -> dist/
    
    # ---------- runtime --------
    FROM node:20-alpine
    WORKDIR /app
    COPY --from=build /app/package*.json ./
    RUN npm ci --omit=dev
    COPY --from=build /app/dist ./dist
    
    ENV NODE_ENV=production
    EXPOSE 3000
    CMD ["node", "dist/index.js"]
    
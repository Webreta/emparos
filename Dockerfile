# Prod imajı — Next.js standalone çıktı (Easypanel: Dockerfile build, port 3000)
# Ortam değişkenleri (DATABASE_URL vb.) çalışma anında Easypanel'den verilir; build DB'ye bağlanmaz.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
# public/ yazılabilir olmalı: panel yüklemeleri public/uploads altına gider (Easypanel'de /app/public/uploads volume olarak bağlanır)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public/uploads
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]

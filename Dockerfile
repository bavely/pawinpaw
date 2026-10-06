FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
# --legacy-peer-deps: the old lockfile has a dev-only peer conflict (sass-loader vs webpack 1)
# that modern npm rejects; dev deps aren't installed here anyway.
RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

# public/bundle.js is the prebuilt webpack output committed to the repo
# (the "build" script is webpack 1 in watch mode), so no build stage here.
COPY . .

EXPOSE 8000
CMD ["node", "server.js"]

FROM node:18.18.2-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
EXPOSE 5173
CMD ["node", "build"]

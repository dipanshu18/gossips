FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

FROM base AS dev
CMD [ "pnpm", "dev" ]

FROM base AS prod
RUN pnpm build
CMD [ "pnpm", "start" ]
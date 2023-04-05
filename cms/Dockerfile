FROM node:18-slim

# hadolint ignore=DL3018
RUN npm update -g npm && \
  npm install -g pnpm && \
  apt-get update && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY package.json pnpm-lock.yaml /code/

RUN pnpm install

CMD ["npm", "run", "dev"]

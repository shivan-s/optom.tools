FROM node:18-slim

ENV NODE_ENV=development

# hadolint ignore=DL3016
RUN npm update -g npm && \
  npm install -g pnpm && \
  apt-get update && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY package.json pnpm-lock.yaml /code/

RUN pnpm install

CMD ["npm", "run", "dev", "--", "--host"]

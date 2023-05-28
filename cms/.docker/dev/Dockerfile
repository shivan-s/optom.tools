FROM node:18-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# hadolint ignore=DL3018
RUN apk update && \
  apk add --no-cache build-base \
  gcc \
  autoconf \
  automake \
  zlib-dev \
  libpng-dev \
  nasm \
  bash \
  vips-dev && \
  rm -rf /var/lib/apt/lists/*

# hadolint ignore=DL3016
RUN npm update -g npm
WORKDIR /code
COPY ./package*.json ./
RUN npm install
ENV PATH /code/node_modules/.bin:$PATH
EXPOSE 1337
CMD ["npm", "run", "develop"]

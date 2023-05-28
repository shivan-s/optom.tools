FROM node:18-alpine as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# hadolint ignore=DL3018
RUN apk update && \
  apk add --no-cache build-base \
  gcc \
  autoconf \
  automake \
  zlib-dev \
  libpng-dev \
  vips-dev && \
  rm -rf /var/cache/apk/* > /dev/null 2>&1

# hadolint ignore=DL3016
RUN npm update -g npm
WORKDIR /code
COPY ./package*.json ./
ENV PATH /code/node_modules/.bin:$PATH
RUN npm install --omit=dev
WORKDIR /code/app
COPY ../../ .
RUN npm run build

FROM node:18-alpine

# hadolint ignore=DL3018
RUN apk update && \
  apk add --no-cache vips-dev && \
  rm -rf /var/cache/apk/*
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /code
COPY --from=build /code/node_modules ./node_modules
ENV PATH /code/node_modules/.bin:$PATH
COPY --from=build /code/app ./
EXPOSE 1337
CMD ["npm", "run","start"]

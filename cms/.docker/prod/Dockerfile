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
COPY ../../ ./package*.json ./
ENV PATH /code/node_modules/.bin:$PATH
RUN npm config set network-timeout 600000 -g && npm install --omit=dev
WORKDIR /code/app
COPY ../../ /code/app
RUN npm run build

FROM node:18-alpine
# hadolint ignore=DL3018
RUN apk update && \
  apk add --no-cache vips-dev && \
  rm -rf /var/cache/apk/*
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=build /code/node_modules /code/node_modules
WORKDIR /code/app
COPY --from=build /code /code/app
ENV PATH /code/node_modules/.bin:$PATH

RUN chown -R node:node /code/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]

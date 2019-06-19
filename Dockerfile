FROM node:10.16-alpine

WORKDIR /sneakers
ENV PORT 3100
ENV NODE_ENV production

# copy only required files
COPY package.json /sneakers
COPY tsconfig.json /sneakers
COPY yarn.lock /sneakers
COPY app /sneakers/app
COPY config /sneakers/config
COPY public /sneakers/public

# prepare app in production mode
RUN ["yarn", "install", "--production", "--no-progress"]

# build and remove unnecessary files
RUN ["yarn", "build"]
RUN ["rm", "-rf", "app", "config"]

# start
CMD ["yarn", "start"]

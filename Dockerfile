FROM node:10.16-alpine

ENV PORT 3100
ENV NODE_ENV production

# copy files required for build
WORKDIR /workdir
COPY src /workdir/src
COPY public /workdir/public
COPY package.json /workdir
COPY postcss.config.js /workdir
COPY tsconfig.json /workdir
COPY webpack.config.js /workdir
COPY yarn.lock /workdir

# build app
RUN ["yarn", "install", "--production=false", "--no-progress"]
RUN ["yarn", "build"]

# leave only built files, and install production deps
WORKDIR /sneakers
COPY package.json /sneakers
COPY yarn.lock /sneakers
RUN ["cp", "-R", "/workdir/build", "."]
RUN ["yarn", "install", "--production=true", "--no-progress"]

# remove workdir
RUN ["rm", "-rf", "/workdir"]

# start
CMD ["yarn", "start"]

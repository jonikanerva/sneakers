FROM node:12.16-alpine AS builder

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

FROM node:12.16-alpine
# leave only built files, and install production deps
WORKDIR /sneakers
COPY --from=builder /workdir/package.json /sneakers
COPY --from=builder /workdir/yarn.lock /sneakers
COPY --from=builder /workdir/build /sneakers/build
RUN ["yarn", "install", "--production=true", "--no-progress"]

# start
CMD ["yarn", "start"]

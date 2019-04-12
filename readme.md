# sneakers

latest sneaker images from the web

# setup

install with `nvm use && yarn install`.

start server `yarn build && yarn start`.

start server in watch mode `yarn s`.

# build for deploy

```
docker build -t registry.gitlab.com/jonikanerva/dok/sneakers:latest .
docker push registry.gitlab.com/jonikanerva/dok/sneakers:latest
```

# deploy

deploy files and instructions can be found from https://gitlab.com/jonikanerva/dok

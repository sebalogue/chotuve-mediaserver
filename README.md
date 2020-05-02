# Chotuve - Media server
![Grupo](https://img.shields.io/badge/grupo-11-blue) [![Build Status](https://travis-ci.com/sebalogue/chotuve-mediaserver.svg?token=pxhQ2W5miJyHZq81NsPq&branch=master)](https://travis-ci.com/github/sebalogue/chotuve-mediaserver)
[![sv](https://img.shields.io/badge/view-media%20sv-important)](https://github.com/sebalogue/chotuve-mediaserver)
[![sv](https://img.shields.io/badge/view-auth%20sv-important)](https://github.com/santiagomariani/chotube-auth-server)
[![sv](https://img.shields.io/badge/view-app%20sv-important)](https://github.com/Franco-Giordano/chotuve-appserver)
[![sv](https://img.shields.io/badge/view-android-important)](https://github.com/javier2409/Chotuve-Android)


# Development: Docker-compose

`docker-compose up`

# Production: Dockerfile

## Build
`docker build --build-arg NODE_ENV=production --tag media_server_prod .`

Así se crea la imagen ignorando las devDependencies en el `npm install`

## Run

`docker run -p 8080:8080 -d media_server_prod`

# Heroku
### Login
`heroku login`

`heroku container:login`

### Build and push container
`heroku container:push web`

### Release
`heroku container:release web`

# Run ESLint
`npx eslint <filename>`

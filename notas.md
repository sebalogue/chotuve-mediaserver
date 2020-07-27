
# Development: Docker-compose

`NODE_ENV=dev docker-compose up --build`

# Test: Docker-compose

`NODE_ENV=test docker-compose up --build -d`
`docker exec -it chotuve-media-server npm test`

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

# Development: Docker-compose

`docker-compose up`

# Production: Dockerfile

## Build
`docker build --build-arg NODE_ENV=production --tag media_server_prod`

Así se crea la imagen ignorando las devDependencies en el `npm install`

## Run

`docker run -p 8080:8080 -d media_server_prod`

# Heroku
### Build and push container
`heroku container:push web`

### Release
`heroku container:release web`

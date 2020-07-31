# Chotuve - Media server
![Grupo](https://img.shields.io/badge/grupo-11-blue) [![Build Status](https://travis-ci.com/sebalogue/chotuve-mediaserver.svg?token=pxhQ2W5miJyHZq81NsPq&branch=master)](https://travis-ci.com/github/sebalogue/chotuve-mediaserver)
[![codecov](https://codecov.io/gh/sebalogue/chotuve-mediaserver/branch/master/graph/badge.svg?token=4ZD8NUHT3C)](https://codecov.io/gh/sebalogue/chotuve-mediaserver)
[![sv](https://img.shields.io/badge/view-media%20sv-important)](https://github.com/sebalogue/chotuve-mediaserver)
[![sv](https://img.shields.io/badge/view-auth%20sv-important)](https://github.com/santiagomariani/chotube-auth-server)
[![sv](https://img.shields.io/badge/view-app%20sv-important)](https://github.com/Franco-Giordano/chotuve-appserver)
[![sv](https://img.shields.io/badge/view-android-important)](https://github.com/javier2409/Chotuve-Android)


# Instrucciones

## Desarrollo local

1. Instalar Docker Engine y Docker Compose

2. Asegurarse de tener el archivo 'chotuve-videos-firebase-adminsdk.json' en la raiz con las credenciales de firebase.

3. Levantar server + database `NODE_ENV=dev docker-compose up --build`

4. Probar la REST API en `http://localhost:8080`

## Testing

1. Levantar server + database: `NODE_ENV=test docker-compose up --build`

2. Ejecutar tests: `docker exec -it chotuve-media-server npm test`

## Para probar ambiente de produccion de manera local

1. `docker build --build-arg NODE_ENV=production --tag media_server_prod .`

Así se crea la imagen ignorando las devDependencies en el `npm install`

2. `docker run -p 8080:8080 -d media_server_prod`

## Para pushear el código local a Heroku:

1. `heroku login`

2. `heroku container:login`

3. `heroku container:push web`

### Release:
4. `heroku container:release web`

## Variables de entorno necesarias:
NODE_ENV
PORT
MONGODB_URI

FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID

CLIENT_TOKEN

# Linter
El linter utilizado para el proyecto es EsLint.
Se puede correr con `npx eslint` desde la terminal.

# API
La documentación Open Api se encuentra en el archivo open-api-doc.yaml

 - **Add video:** `POST http://localhost:8080/videos` con body:
 ```
{
  "videoId": "123",
  "url": "example/url"
}
 ```

Respuesta exitosa:
 ```
{
  "videoId": "123",
  "url": "example/url",
  "timestamp": "12/12/12"
}
 ```

 - **Get video:** `GET http://localhost:8080/videos/:id`.


 Respuesta exitosa:
  ```
{
  "videoId": "123",
  "url": "example/url",
  "timestamp": "12/12/12"
}
 ```

 - **Delete a video:** `DELETE http://localhost:8080/videos/:id`.

 Respuesta exitosa:
```
"status: "OK
 ```
-----

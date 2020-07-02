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

2. Asegurarse de tener el archivo 'chotuve-videos-firebase-adminsdk.json' en la raiz con las credenciales de firebase. Despues seguro tengamos una cuenta de firebase para desarrollo y otra para produccion, hay que ver esto bien.

3. Levantar server + database `docker-compose up`

4. Probar la REST API en `http://localhost:8080`

## API

 - **Add video:** `POST http://localhost:8080/video` con body:
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

 - **Get video:** `GET http://localhost:8080/video` con body:
 ```
{
  "videoId": "123",
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

 - **Delete a video:** `DELETE http://localhost:8080/video` con body:
 ```
{
  "videoId": "123",
}
 ```

 Respuesta exitosa:
```
"status: "OK
 ```
-----

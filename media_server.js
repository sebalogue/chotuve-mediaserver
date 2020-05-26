const express = require('express');
const DbHandler = require('./db/dbHandler.js')
const mongoose = require('mongoose');
const Videos = require('./services/videos.js');
const DbFileNotFoundError = require('./services/errors/dbFileNotFoundError');
const FirebaseFileNotFoundError = require('./services/errors/firebaseFileNotFoundError');

const app = express();
const { port } = require('./config');
const NOT_FOUND_STATUS = 404;
const NOT_FOUND_IN_DB = 'File not found in Database';
const NOT_FOUND_IN_FIREBASE = 'File not found in firebase';

app.use(express.json()) // for parsing application/json

app.get('/', function(req, res) {
  res.send('HelloWorld!');
});

// ------------------- //

// Agregar video a base de datos
// Deberia llegar url y videoId del video
// Responde url timestamp y videoId
app.post('/video', function(req, res) {
  const videos = new Videos();
  const videoId = req.body['videoId'];
  const url = req.body['url'];
  console.log("video add (post)............");
  videos.add(videoId, url)
    .then((timeStamp) => {
      console.log("video added............");
      res.status(OK_STATUS).json({
        status: OK_STATUS_STR,
        timeStamp: timeStamp,
        videoId: videoId
      });
    })
    .catch((error) => {
      //console.log(error);
      if (error instanceof DbFileNotFoundError) {
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_DB});
      }
      if (error instanceof FirebaseFileNotFoundError){
        console.log('el error, sisi');
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_FIREBASE});
      }
    });
});

// Obtener la url de un video
// Deberia llegar el videoId
// Responde url, timestamp y videoId
app.get('/video', async function(req, res) {
  const videos = new Videos();
  const videoId = req.body['videoId'];
  const timeStamp = await videos.getTimeCreated(videoId); // ver errores
  videos.getUrl(videoId)
    .then((url) => {
      res.status(OK_STATUS).json({
        status: OK_STATUS_STR,
        url: url,
        timeStamp: timeStamp
      });
    })
    .catch((error) => {
      if (error instanceof DbFileNotFoundError) {
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_DB});
      }
    });
});

// Eliminar un video de la base de datos
// Deberia llegar el videoId
app.delete('/video', function(req, res) {
  const videos = new Videos(); // crear Videos() una vez (por lo de firebase initialize)
  const videoId = req.body['videoId'];
  videos.delete(videoId)
    .then(() => {
      res.status(OK_STATUS).json({status: OK_STATUS_STR});
    })
    .catch((error) => {
      if (error instanceof DbFileNotFoundError) {
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_DB});
      }
      if (error instanceof FirebaseFileNotFoundError){
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_FIREBASE});
      }
    });
});

// ----------------------------------------


app.get('/dbstatus', function(req, res) {
  const mongooseDbHandler = new DbHandler();
  mongooseDbHandler.open(function(err) {
    res.send("Error al conectar");
  },
  function() {
    res.send((mongoose.connection.readyState).toString())
  });
});

app.listen(port, function() {
  console.log(`Example app listening at: http://localhost:${port}`);
});


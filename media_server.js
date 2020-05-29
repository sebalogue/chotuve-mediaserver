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
const UNKNOWN_ERROR = 500;
const UNKNOWN_ERROR_STR = 'Unknown internal error';
const CREATED_STATUS = 201;
const CREATED_STATUS_STR = 'Video added';
const OK_STATUS = 200;
const OK_STATUS_STR = 'OK';

app.use(express.json()) // for parsing application/json

app.get('/', function(req, res) {
  res.send('HelloWorld!');
});

// ------------------- //

// Agregar video a base de datos
// Deberia llegar url y videoId del video
// Responde url timestamp y videoId
app.post('/video', function(req, res) {
  const videos = Videos;
  const videoId = req.body['videoId'];
  const url = req.body['url'];
  videos.add(videoId, url)
    .then((timeStamp) => {
      res.status(CREATED_STATUS).json({
        status: CREATED_STATUS_STR,
        timeStamp: timeStamp,
        videoId: videoId
      });
    })
    .catch((error) => {
      if (error instanceof DbFileNotFoundError) {
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_DB});
      }
      else if (error instanceof FirebaseFileNotFoundError){
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_FIREBASE});
      } else {
        res.status(UNKNOWN_ERROR).json({status: UNKNOWN_ERROR_STR});
      }
    });
});

// Obtener la url de un video
// Deberia llegar el videoId
// Responde url, timestamp y videoId
app.get('/video', async function(req, res) {
  const videos = Videos;
  const videoId = req.body['videoId'];
  let timeStamp;
  try {
    timeStamp = await videos.getTimeCreated(videoId); // ver errores
  } catch (error) {
    if (error instanceof DbFileNotFoundError) {
      res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_DB});
    } else {
      console.log(error);
      res.status(UNKNOWN_ERROR).json({status: UNKNOWN_ERROR_STR});
    }
    return;
  }
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
      } else {
        res.status(UNKNOWN_ERROR).json({status: UNKNOWN_ERROR_STR});
      }
    });
});

// Eliminar un video de la base de datos
// Deberia llegar el videoId
app.delete('/video', function(req, res) {
  const videos = Videos; // crear Videos() una vez (por lo de firebase initialize)
  const videoId = req.body['videoId'];
  videos.delete(videoId)
    .then(() => {
      res.status(OK_STATUS).json({status: OK_STATUS_STR});
    })
    .catch((error) => {
      if (error instanceof DbFileNotFoundError) {
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_DB});
      }
      else if (error instanceof FirebaseFileNotFoundError){
        res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_FIREBASE});
      } else {
        res.status(UNKNOWN_ERROR).json({status: UNKNOWN_ERROR_STR});
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


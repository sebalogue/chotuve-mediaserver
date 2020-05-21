const express = require('express');
const DbHandler = require('./db/dbHandler.js')
const mongoose = require('mongoose');
const Videos = require('./services/videos.js');

const app = express();
const { port } = require('./config');

app.use(express.json()) // for parsing application/json

app.get('/', function(req, res) {
  res.send('HelloWorld!');
});

// ------------------- //

// Agregar video a base de datos
// Deberia llegar url y videoId del video
app.post('/video', function(req, res) {
  const videos = new Videos();
  const videoId = req.body['videoId'];
  const url = req.body['url'];
  videos.add(videoId, url)
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

// Obtener la url de un video
// Deberia llegar el videoId
app.get('/video', function(req, res) {
  const videos = new Videos();
  const videoId = req.body['videoId'];
  videos.getUrl(videoId)
    .then((url) => {
      res.status(OK_STATUS).json({
        status: OK_STATUS_STR,
        url: url
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
  const videos = new Videos();
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


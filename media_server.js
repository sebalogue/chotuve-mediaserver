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

  // Llamar a Videos.add()
  const videos = new Videos();
  const videoId = req.body['videoId'];
  const url = req.body['url'];
  videos.add(videoId, url);
  res.json(req.body);
});

// Obtener la url de un video
// Deberia llegar el videoId
app.get('/video', function(req, res) {

  // Llamar a Videos.getUrl()

});

// Eliminar un video de la base de datos
// Deberia llegar el videoId
app.delete('/video', function(req, res) {

  // Llamar a Video.delete()

});


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

/*
app.get('/find', function(req, res) {
  const videos = new Videos;
  videos.find(res);

  const mongooseDbHandler = new DbHandler(MONGODB_URI, options);
  mongooseDbHandler.connect(mongoose);
  const db = mongoose.connection;
        db.on('error', function(err) {
          console.log("error");
        });
        db.once('open', function() {
          var result = [];
          const videos = new Videos;
          videos.find(res);

        });

});
*/

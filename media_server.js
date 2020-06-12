const express = require('express');
const DbHandler = require('./db/dbHandler.js')
const mongoose = require('mongoose');
const VideosController = require('./routes/videosController.js');
const { check, validationResult } = require('express-validator');

const app = express();
const { port } = require('./config');

//app.use(express.json()) // for parsing application/json
app.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(400).send('Invalid JSON');
    }
  }
}));

app.get('/', function(req, res) {
  res.send('HelloWorld!');
});

// ------------------- //

// Agregar video a base de datos
// Deberia llegar url y videoId del video
// Responde url timestamp y videoId
app.post('/video', [
  check('videoId').exists(),
  check('url').exists().isString()
], function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const videoId = req.body['videoId'];
  const url = req.body['url'];
  const videosController = new VideosController();
  videosController.postVideo(videoId, url, res);
});

// Obtener la url de un video
// Deberia llegar el videoId
// Responde url, timestamp y videoId
app.get('/video', [
  check('videoId').exists()
], async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const videoId = req.body['videoId'];
  const videosController = new VideosController();
  await videosController.getVideo(videoId, res);
});

// Eliminar un video de la base de datos
// Deberia llegar el videoId
app.delete('/video',[
  check('videoId').exists()
], function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const videoId = req.body['videoId'];
  const videosController = new VideosController();
  videosController.getVideo(videoId, res);
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


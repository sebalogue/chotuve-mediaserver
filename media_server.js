const express = require('express');
const VideosController = require('./routes/videosController.js');
const { check, validationResult } = require('express-validator');
const Logger = require('./services/logger');

const app = express();
const { port, clientToken } = require('./config');

//app.use(express.json()) // for parsing application/json
app.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      if (req.method != 'DELETE' && req.method != 'GET') {
        JSON.parse(buf);
      }
    } catch(e) {
      res.status(400).send('Invalid JSON');
      res.end();
      return;
    }
  }
}));

app.use(function (req, res, next) {
    if (!req.get('x-client-token')) {
      res.status(400).send('Client token missing!');
      return;
    }
    if (req.get('x-client-token') != clientToken) {
      res.status(400).send('Invalid client token!');
      return;
    }
    next();
  }
);

app.get('/', function(req, res) {
  res.send('HelloWorld!');
});

// ------------------- //

// Agregar video a base de datos
// Deberia llegar url y videoId del video
// Responde url timestamp y videoId
app.post('/videos', [
  check('videoId').exists(),
  check('url').exists().isString()
], function(req, res) {
  Logger.logInfo('POST /videos request');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Logger.logWarn('POST /videos: invalid Format');
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
app.get('/videos/:id', [
  check('id').exists().isNumeric()
], async function(req, res) {
  Logger.logInfo('GET /videos request');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Logger.logWarn('GET /videos: invalid Format');
    return res.status(400).json({ errors: errors.array() });
  }
  const videoId = parseInt(req.params.id);
  Logger.logInfo(videoId);
  const videosController = new VideosController();
  await videosController.getVideo(videoId, res);
});

// Eliminar un video de la base de datos
// Deberia llegar el videoId
app.delete('/videos/:id',[
  check('id').exists().isNumeric()
], function(req, res) {
  Logger.logInfo('DELETE /videos request');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Logger.logWarn('DELETE /videos: invalid Format');
    return res.status(400).json({ errors: errors.array() });
  }
  const videoId = parseInt(req.params.id);
  const videosController = new VideosController();
  videosController.getVideo(videoId, res);
});


// Actualizar url de un video
app.put('/videos', [
  check('videoId').exists(),
  check('url').exists().isString()
]), function(req, res) {
  Logger.logInfo('PUT /videos request');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Logger.logWarn('PUT /videos: invalid Format');
    return res.status(400).json({ errors: errors.array() });
  }
  const videoId = req.body['videoId'];
  const url = req.body['url'];
  const videosController = new VideosController();
  videosController.putVideo(videoId, url, res);
}
// ----------------------------------------

app.listen(port, function() {
  Logger.logInfo(`Example app listening at: http://localhost:${port}`);
});

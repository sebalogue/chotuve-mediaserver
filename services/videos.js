const DbHandler = require('../db/db_handler.js');

class Videos {
  constructor() {
    this.mongooseDbHandler = new DbHandler();
  }

  add(videoId, url) {
    // Buscar video en firebase a partir de url
    // Almacenar metadata en base de datos MongoDB

    //hacer funciones con DbHandler.open( {}, {} )

  }

  getUrl(videoId) {
    // Buscar url en base de datos a partir de video id
    // enviar url (ver si devolver o tener callback)

    //hacer funciones con DbHandler.open( {}, {} )

  }

  delete(videoId) {
    // Borrar video de firebase
    // Borrar datos en base de datos

    //hacer funciones con DbHandler.open( {}, {} )

  }

  /*
  find(res) {
    const db = mongoose.connection;
    const VideosModel = require('../db/models/video_model');

    VideosModel.
      find()
      .where('url').equals('chotuve.com/watch/ejemplo')
      .limit(1)
      .exec(function (err, video) {
        if (err) return handleError(err);
        res.send(JSON.stringify(video));
      });
  }
  */
}

module.exports = Videos;

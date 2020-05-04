const DbHandler = require('../db/db_handler.js');

class Videos {
  constructor() {
    this.mongooseDbHandler = new DbHandler();
  }

  add(videoId, newUrl) {
    // Buscar video en firebase a partir de url
    // Almacenar metadata en base de datos MongoDB

    //hacer funciones con DbHandler.open( {}, {} )

    function whenOpen() {
      const VideosModel = require('../db/models/video_model');

      var newVideo = new VideosModel({
        videoId: videoId,
        url: newUrl,
        name: 'defaultName',
        size: 800, // defualt size
      });

      newVideo.save(function (err) {
        if (err) console.log(err); // ver errores
        // saved!
        console.log('Saved');
      });
    };

    function onError(err) {
      console.log(err); // ver errores
    };

    this.mongooseDbHandler.open(onError, whenOpen);
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

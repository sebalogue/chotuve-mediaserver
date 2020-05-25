const mongoose = require('mongoose');
const VideosModel = require('./models/videoModel');
const { mongodb_uri } = require('../config');

// https://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html
// https://juanda.gitbooks.io/tutorial-sobre-acceso-a-bases-de-datos-mongodb-de/mongoose.html

class DbHandler {
  constructor() {
    this.options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      family: 4, // Use IPv4, skip trying IPv6
      useUnifiedTopology: true,
    };

    this.uri = mongodb_uri;
  }

  connect() {
    mongoose.connect(this.uri, this.options).catch((err) => {
      console.error.bind(console, err);
    });
  }

  open(errorFunction, openFunction) {
    this.connect();
    const db = mongoose.connection;
    db.on('error', errorFunction);
    db.once('open', openFunction);
  }

  add(videoId, url, metadata) {
    function whenOpen() {
      var newVideo = new VideosModel({
        videoId: videoId,
        url: url,
        name: metadata.name,
        size: metadata.size,
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

    this.open(onError, whenOpen);
  }

  getUrl(videoId) {
    const query = VideosModel.find({ videoId: videoId });
    let video;
    try {
      video = query.exec();
    } catch (error) {
      // manejar errores
      console.error(error);
    }
    return video.url;
  }

  remove(videoId) {
    VideosModel.findOneAndRemove({ videoId: videoId }, function(error, doc) {
      if (error) {
        // manejar errores
        console.error(error);
      }
    });
  }
}

module.exports = DbHandler;

const Database = require('../db/database');
const VideosModel = require('../db/models/videoModel');

class VideosDocuments {
  constructor() {
    this.database = Database;
  }

  async add(videoId, url, metadata) {
    const newVideo = new VideosModel({
      videoId: videoId,
      url: url,
      name: metadata.name,
      size: metadata.size,
    });

    try {
      await newVideo.save();
      return true;
    } catch(error) {
      console.log(error);
    }
  }

  async exists(videoId) {
    try {
      const resp = await VideosModel.exists({
        videoId: videoId,
      });
      return resp;
    } catch(error) {
      console.log(err.message);
    }
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

  async close() {
    await this.database.close();
  }

  async _dropDatabase() {
    await this.database.drop();
  }
}

module.exports = VideosDocuments;

const Database = require('../db/database');
const VideosModel = require('../db/models/videoModel');
const DbFileNotFoundError = require('./errors/dbFileNotFoundError');

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
      console.log(error.message);
    }
  }

  getUrl(videoId) {
    // Buscar url en base de datos a partir de video id
    // enviar url (ver si devolver o tener callback)

  }

  async delete(videoId) {
    try {
      const exists = await this.exists(videoId);
      if (!exists) {
        throw new DbFileNotFoundError;
      }
      await VideosModel.deleteOne({
        videoId: videoId,
      });
      return true;
    } catch(error) {
        if (error instanceof DbFileNotFoundError){
          throw new DbFileNotFoundError;
        }
        console.log(error.message);
    }
  }

  async close() {
    await this.database.close();
  }

  async _dropDatabase() {
    await this.database.drop();
  }
}

module.exports = VideosDocuments;

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

  async getUrl(videoId) {
    // Buscar url en base de datos a partir de video id
    const query = VideosModel.find({ videoId: videoId });
    let doc;
    try {
      doc = await query.exec();
    } catch(error) {
      console.log(error);
    }
    if (!doc.length) {
      throw new DbFileNotFoundError;
    }
    return doc[0].url;
  }

  async delete(videoId) {
    let exists;
    try {
      exists = await this.exists(videoId);
      if (exists) {
        await VideosModel.deleteOne({
          videoId: videoId,
        });
      }
    } catch(error) {
        console.log(error.message);
    }
    if (!exists) {
      throw new DbFileNotFoundError;
    }
    return true;
  }

  async close() {
    await this.database.close();
  }

  async _dropDatabase() {
    await this.database.drop();
  }
}

module.exports = VideosDocuments;

const Database = require('../db/database');
const VideosModel = require('../db/models/videoModel');
const DbFileNotFoundError = require('./errors/dbFileNotFoundError');
const Logger = require('./logger');


class VideosDocuments {
  constructor() {
    this.database = Database;
  }

  async add(videoId, url, metadata) {
    const newVideo = new VideosModel({
      videoId,
      url,
      name: metadata.name,
      size: metadata.size,
      timeCreated: metadata.timeCreated,
    });

    try {
      await newVideo.save();
      Logger.logInfo('Successful database request: add');
      return true;
    } catch (error) {
      Logger.logERror(error);
    }
  }

  async exists(videoId) {
    try {
      const resp = await VideosModel.exists({
        videoId,
      });
      Logger.logInfo('Successful database request: exists');
      return resp;
    } catch (error) {
      Logger.logError(error);
    }
  }

  async getUrl(videoId) {
    // Buscar url en base de datos a partir de video id
    const query = VideosModel.find({ videoId });
    let doc;
    try {
      doc = await query.exec();
    } catch (error) {
      Logger.logError(error);
    }
    if (!doc.length) {
      throw new DbFileNotFoundError();
    }
    Logger.logInfo('Successful database request: find');
    return doc[0].url;
  }

  async getTimeCreated(videoId) {
    // Buscar url en base de datos a partir de video id
    const query = VideosModel.find({ videoId });
    let doc;
    try {
      doc = await query.exec();
    } catch (error) {
      Logger.logError(error);
      return;
    }
    if (!doc.length) {
      throw new DbFileNotFoundError();
    }
    Logger.logInfo('Successful database request: find');
    return doc[0].timeCreated;
  }

  async delete(videoId) {
    let exists;
    try {
      exists = await this.exists(videoId);
      if (exists) {
        await VideosModel.deleteOne({
          videoId,
        });
      }
    } catch (error) {
      Logger.logError(error);
      // internal error
    }
    if (!exists) {
      throw new DbFileNotFoundError();
    }
    Logger.logInfo('Succesfull database request: exists and delete');
    return true;
  }

  async getName(videoId) {
    // Buscar url en base de datos a partir de video id
    const query = VideosModel.find({ videoId });
    let doc;
    try {
      doc = await query.exec();
    } catch (error) {
      Logger.logError(error);
    }
    if (!doc.length) {
      throw new DbFileNotFoundError();
    }
    Logger.logInfo('Succesfull database request: find');
    return doc[0].name;
  }

  async close() {
    await this.database.close();
  }

  async _dropDatabase() {
    await this.database.drop();
  }
}

module.exports = VideosDocuments;

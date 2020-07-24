const mongoose = require('mongoose');
const Logger = require('../services/logger');
const { mongodbUri, dbOptions } = require('../config');

class Database {
  constructor() {
    this.uri = mongodbUri;
    this.options = dbOptions;

    mongoose.connect(this.uri, this.options).catch((err) => {
      Logger.logError(err);
    });

    this.db = mongoose.connection;
    this.db.on('error', (err) => {
      Logger.logError(err);
    });
    this.db.once('open', () => {
      Logger.logInfo('Databese connection: successful');
    });
  }

  async close() {
    await this.db.close();
    Logger.logInfo('Database connection closed');
  }

  async drop() {
    await this.db.dropDatabase();
    Logger.logInfo('Database dropped');
  }
}

module.exports = new Database();

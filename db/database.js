let mongoose = require('mongoose');
const { mongodbUri, dbOptions } = require('../config');

class Database {
  constructor() {
    this.uri = mongodbUri;
    this.options = dbOptions;

    mongoose.connect(this.uri, this.options).catch((err) => {
      console.error.bind(console, err);
    });

    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'Database connection Error : '));
    this.db.once('open', function(){
      // console.log('Database connection ok!');
    });
  }

  async close() {
    await this.db.close();
  }

  async drop() {
    await this.db.dropDatabase();
  }
}

module.exports = new Database();

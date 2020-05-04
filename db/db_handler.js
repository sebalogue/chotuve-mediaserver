const mongoose = require('mongoose');

const { mongodb_uri } = require('../config');

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
}

module.exports = DbHandler;

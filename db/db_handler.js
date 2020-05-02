const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_6z92px8v:tntp2l48id2sbk2rffn715iejf@ds241658.mlab.com:41658/heroku_6z92px8v';

class DbHandler {
  constructor() {
    this.options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      family: 4, // Use IPv4, skip trying IPv6
      useUnifiedTopology: true,
    };

    this.uri = MONGODB_URI;
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

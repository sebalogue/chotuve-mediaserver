// config.js
require('dotenv').config();

const env = process.env.NODE_ENV // 'dev', 'test' or 'prod'

const mongodb_uri_prod = 'mongodb://heroku_6z92px8v:tntp2l48id2sbk2rffn715iejf@ds241658.mlab.com:41658/heroku_6z92px8v';

const dev = {
  port: process.env.PORT || 8080, // app port
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://mongo:27017'
};

const prod = {
  port: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI || mongodb_uri_prod
};

const test = {
  port: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI
};

const config = {
  dev,
  test,
  prod
};

module.exports = config[env];

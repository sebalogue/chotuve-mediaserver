// config.js
require('dotenv').config();

const env = process.env.NODE_ENV // 'dev', 'test' or 'prod'

const mongodb_uri_prod = '';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const dev = {
  port: process.env.PORT || 8080, // app port
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://mongo:27017',
  firebaseConfig: firebaseConfig,
};

const prod = {
  port: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI || mongodb_uri_prod
  firebaseConfig: firebaseConfig,
};

const test = {
  port: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI
  firebaseConfig: firebaseConfig,
};

const config = {
  dev,
  test,
  prod
};

module.exports = config[env];

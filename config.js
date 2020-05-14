// config.js
require('dotenv').config();

const env = process.env.NODE_ENV // 'dev', 'test' or 'prod'

const mongodb_uri_prod = 'mongodb://heroku_6z92px8v:tntp2l48id2sbk2rffn715iejf@ds241658.mlab.com:41658/heroku_6z92px8v';

const firebaseConfig = {
  apiKey: "AIzaSyDlBeowWP8UPWsvk9kXj9JDaN5_xsuNu4I",
  authDomain: "chotuve-videos.firebaseapp.com",
  databaseURL: "https://chotuve-videos.firebaseio.com",
  projectId: "chotuve-videos",
  storageBucket: "chotuve-videos.appspot.com",
  messagingSenderId: "662757364228",
  appId: "1:662757364228:web:02d934f2819b5d58581b51"
};


const dev = {
  port: process.env.PORT || 8080, // app port
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://mongo:27017',
  firebaseConfig: firebaseConfig,
};

const prod = {
  port: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI || mongodb_uri_prod,
  firebaseConfig: firebaseConfig,
};

const test = {
  port: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI,
  firebaseConfig: firebaseConfig,
};

const config = {
  dev,
  test,
  prod
};

module.exports = config[env];

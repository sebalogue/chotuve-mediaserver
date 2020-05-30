// config.js
require('dotenv').config();

// URL de nu objeto en el bucket de firebase storage:
// http://storage.googleapis.com/BUCKET_NAME/OBJECT_NAME
// o bien
// http://BUCKET_NAME.storage.googleapis.com/OBJECT_NAME

const env = process.env.NODE_ENV // 'dev', 'test' or 'prod'

const mongodb_uri_prod = process.env.MONGODB_URI;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


const dbOptionsAll = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true,
};


const dev = {
  port: process.env.PORT || 8080, // app port
  mongodbUri: process.env.MONGODB_URI || 'mongodb://mongo:27017',
  firebaseConfig: firebaseConfig,
  dbOptions: dbOptionsAll,
};

const prod = {
  port: process.env.PORT || 8080,
  mongodbUri: process.env.MONGODB_URI || mongodb_uri_prod,
  firebaseConfig: firebaseConfig,
  dbOptions: dbOptionsAll,
};

const test = {
  port: process.env.PORT || 8080,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://mongo_test:27018',
  firebaseConfig: firebaseConfig,
  dbOptions: dbOptionsAll,
};

const config = {
  dev,
  test,
  prod
};

module.exports = config[env];

const admin = require('firebase-admin');
const { firebaseConfig } = require('../config');
const serviceAccount = require('../super_secret.json');
const FirebaseFileNotFoundError = require('./errors/firebaseFileNotFoundError');
const UnhandledFirebaseError = require('./errors/unhandledFirebaseError');
const Logger = require('./logger');

// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');

const NOT_FOUND = 404;

class FirebaseHandler {
  constructor() {
    // Initialize Firebase
    this.config = firebaseConfig;
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'chotuve-videos.appspot.com',
    });
    Logger.logInfo('Firebase App initialized');
  }

  async getVideoMetadata(url) {
    const bucket = admin.storage().bucket();
    const fileName = url;

    let response;
    try {
      const file = bucket.file(fileName);
      response = await file.getMetadata();
      if (!response[1]) {
        throw new FirebaseFileNotFoundError();
      }
      Logger.logInfo('Firebase video metadata obtained');
    } catch (error) {
      if (error.code === 404) {
        throw new FirebaseFileNotFoundError();
      }
      throw new UnhandledFirebaseError(error.code);
    }
    return response[0];
  }

  async deleteVideo(fileName) {
    try {
      const bucket = admin.storage().bucket();
      const file = bucket.file(fileName);
      const fileExists = await file.exists();
      if (!fileExists[0]) {
        throw new FirebaseFileNotFoundError();
      }
      await bucket.deleteFiles({ prefix: fileName });
      Logger.logInfo('Firebase video deleted');
    } catch (error) {
      if (error.code == NOT_FOUND || error instanceof FirebaseFileNotFoundError) {
        throw new FirebaseFileNotFoundError();
      }
      return false; // ver
    }
    return true;
  }

  async uploadFile(filename, destinationName) {
    try {
      const bucket = admin.storage().bucket();
      // Uploads a local file to the bucket
      await bucket.upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        destination: destinationName,
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: 'no-cache',
        },
      });
    } catch (error) {
      throw UnhandledFirebaseError(error.code);
    }
    return true;
  }

  async closeConnection() {
    const p = await this.admin.delete();
    Logger.logInfo('Firebase connection closed');
    return p;
  }

  getFileNameFromUrl(url) {
    const urlSplit = url.split('.com/');
    return urlSplit[urlSplit.length - 1];
  }
}

module.exports = FirebaseHandler;

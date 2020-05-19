const { firebaseConfig } = require('../config');
const admin = require("firebase-admin");
const serviceAccount = require("../super_secret.txt");
const FirebaseFileNotFoundError = require('./errors/firebaseFileNotFoundError');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

class FirebaseHandler {
  constructor() {
    // Initialize Firebase
    this.config = firebaseConfig;
    this.admin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'chotuve-videos.appspot.com',
    });
  }

  async getVideoMetadata(url){
    const bucket = admin.storage().bucket();
    const fileName = this.getFileNameFromUrl(url);
    const file = bucket.file(fileName);

    try {
      const response = await file.getMetadata();
      if (!response[1]) {
        throw FirebaseFileNotFoundError;
      }
      return response[0];
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  async deleteVideo(fileName){
    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);

    const fileExists = await file.exists();
    if (!fileExists[0]) {
      throw new FirebaseFileNotFoundError;
    }

    try {
      const response = await bucket.deleteFiles({prefix: fileName});
      return true;
    } catch (error) {
      if (error.code == 'storage/object-not-found') {
        throw new FileNotFoundError;
      }
    }
  }

  async uploadFile(filename, destinationName) {
    const bucket = admin.storage().bucket();
    // Uploads a local file to the bucket
    try {
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
    } catch (err) {
      return false;
    }
    return true;
  }

  async closeConnection() {
    return await this.admin.delete();
  }

  getFileNameFromUrl(url) {
    const urlSplit = url.split('.com/')
    return urlSplit[urlSplit.length - 1];
  }

}

module.exports = FirebaseHandler;

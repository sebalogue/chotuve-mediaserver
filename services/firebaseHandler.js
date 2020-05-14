
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

const { firebaseConfig } = require('../config');
const admin = require("firebase-admin");
const serviceAccount = require("../google-auth/chotuve-videos-d55886f2edb1.json");



// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

class FirebaseHandler {
  constructor() {
    // Initialize Firebase
    this.config = firebaseConfig;
    // this.app = firebase.initializeApp(this.config);
    this.admin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'gs://chotuve-videos.appspot.com'
    });
  }

  async getVideoMetadata(url){
    const storage = firebase.storage();

    // puede ser https o si no puede ser Google Cloud Storage URI
    const storageReference = storage.refFromURL(url);

    /*
    // Get metadata properties
    forestRef.getMetadata().then(function(metadata) {
      // metadata now contains the metadata for *url*
      metadataStore['timeCreated'] = metadata['timeCreated'];
      metadataStore['size'] = metadata['size'];
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
    */

    // Get metadata properties
    try {
      const metadata = await storageReference.getMetadata();
      return metadata;
    } catch(error) {
      console.error(err);
      return false;
    }
  }

  async  deleteVideo(fileName){
    const bucket = admin.storage().bucket();
    return await bucket.deleteFiles({prefix: fileName});
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
      console.error(err);
      return false;
    }
    return true;
  }

  async closeConnection() {
    return await this.admin.delete();
  }
}

module.exports = FirebaseHandler;

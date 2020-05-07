
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

const { firebaseConfig } = require('./config');


// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

class FirebaseHandler {
  constructor() {
    // Initialize Firebase
    this.config = firebaseConfig;
    firebase.initializeApp(this.config);
  }

  async getVideoMetadata(url, metadataStore){
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
      console.log("Error");
      console.log(err);
    }
  }

  async  deleteVideo(url){
    const storage = firebase.storage();

    // puede ser https o si no puede ser Google Cloud Storage URI
    const storageReference = storage.refFromURL(url);

    // Delete the file
    // usar await
    try {
      await storageReference.delete();
      // File deleted successfully
    } catch (error) {
      console.log("Error deleting file");
      console.log(error);
  }
}
}

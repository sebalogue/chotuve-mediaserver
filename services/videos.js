const VideosDocuments = require('./videosDocuments');
const FirebaseHandler = require('./firebaseHandler');

// https://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html
// https://juanda.gitbooks.io/tutorial-sobre-acceso-a-bases-de-datos-mongodb-de/mongoose.html

class Videos {
  constructor() {
    this.documents = new VideosDocuments();
    this.firebaseHandler = new FirebaseHandler();
  }

  async add(videoId, newUrl) {
    // Buscar video en firebase a partir de url
    const metadata = await this.firebaseHandler.getVideoMetadata(newUrl);

    // Almacenar metadata en base de datos MongoDB
    await this.documents.add(videoId, newUrl, metadata);
  }

  async exists(videoId) {
    return await this.documents.exists(videoId);
  }

  getUrl(videoId) {
    // Buscar url en base de datos a partir de video id
    // enviar url (ver si devolver o tener callback)

    //hacer funciones con DbHandler.open( {}, {} )

  }

  delete(videoId) {
    // Borrar video de firebase
    // Borrar datos en base de datos

    //hacer funciones con DbHandler.open( {}, {} )

  }

  close() {
    this.firebaseHandler.closeConnection();
  }
}

module.exports = Videos;

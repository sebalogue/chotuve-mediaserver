const VideosDocuments = require('./videosDocuments');
const FirebaseHandler = require('./firebaseHandler');

// https://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html
// https://juanda.gitbooks.io/tutorial-sobre-acceso-a-bases-de-datos-mongodb-de/mongoose.html

class Videos {
  constructor(firebaseHandler) {
    this.documents = new VideosDocuments();
    this.firebaseHandler = firebaseHandler;
  }

  async add(videoId, newUrl) {
    // Buscar video en firebase a partir de url
    const metadata = await this.firebaseHandler.getVideoMetadata(newUrl);

    // Almacenar metadata en base de datos MongoDB
    await this.documents.add(videoId, newUrl, metadata);
    return metadata.timeCreated;
  }

  async exists(videoId) {
    return await this.documents.exists(videoId);
  }

  async getUrl(videoId) {
    return await this.documents.getUrl(videoId);
  }

  async delete(videoId) {
    let result;
    try {
      const filename = await this.documents.getName(videoId);
      result = await this.documents.delete(videoId);
      result = result && this.firebaseHandler.deleteVideo(filename);
    } catch (error) {
      if (error instanceof DbFileNotFoundError) {
        throw new DbFileNotFoundError;
      }
      if (error instanceof FirebaseFileNotFoundError) {
        throw new FirebaseFileNotFoundError;
      }
      console.error(error);
    }
    return result;
  }

  async getTimeCreated(videoId) {
    return await this.documents.getTimeCreated(videoId);
  }

  async close() {
    await this.firebaseHandler.closeConnection();
    await this.documents.close();
  }

  async _dropDatabase() {
    await this.documents._dropDatabase();
  }
}

module.exports = Videos;

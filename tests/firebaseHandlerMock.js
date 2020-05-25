class FirebaseHandlerMock {

  getVideoMetadata(url){
    return false;
  }

  async deleteVideo(fileName){
    return true;
  }

  async uploadFile(filename, destinationName) {
    return true
  }

  async closeConnection() {
  }
}

module.exports = FirebaseHandlerMock;

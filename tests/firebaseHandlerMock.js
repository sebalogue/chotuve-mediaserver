class FirebaseHandlerMock {

  getVideoMetadata(url){
    return {
      name: 'mock_name',
      size: 4312,
      timeCreated: new Date('2011-04-11T10:20:30Z')
    };
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

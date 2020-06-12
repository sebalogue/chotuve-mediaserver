const Videos = require('../services/videos.js');
const DbFileNotFoundError = require('../services/errors/dbFileNotFoundError');
const FirebaseFileNotFoundError = require('../services/errors/firebaseFileNotFoundError');

const NOT_FOUND_STATUS = 404;
const NOT_FOUND_IN_DB = 'File not found in Database';
const NOT_FOUND_IN_FIREBASE = 'File not found in firebase';
const UNKNOWN_ERROR = 500;
const UNKNOWN_ERROR_STR = 'Unknown internal error';
const CREATED_STATUS = 201;
const CREATED_STATUS_STR = 'Video added';
const OK_STATUS = 200;
const OK_STATUS_STR = 'OK';

class VideosController {

  catchError(error, res) {
    if (error instanceof DbFileNotFoundError) {
      res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_DB});
    }
    else if (error instanceof FirebaseFileNotFoundError){
      res.status(NOT_FOUND_STATUS).json({status: NOT_FOUND_IN_FIREBASE});
    } else {
      res.status(UNKNOWN_ERROR).json({status: UNKNOWN_ERROR_STR});
    }
  }

  postVideo(videoId, url, res) {
    const videos = Videos;
    videos.add(videoId, url)
      .then((timeStamp) => {
        res.status(CREATED_STATUS).json({
          status: CREATED_STATUS_STR,
          timestamp: timeStamp,
          url: url,
          videoId: videoId
        });
      })
      .catch((error) => {
        this.catchError(error, res);
      });
  }

  async getVideo(videoId, res) {
    const videos = Videos;
    let timeStamp;
    try {
      timeStamp = await videos.getTimeCreated(videoId); // ver errores
    } catch (error) {
      this.catchError(error, res);
      return;
    }
    videos.getUrl(videoId)
      .then((url) => {
        res.status(OK_STATUS).json({
          status: OK_STATUS_STR,
          url: url,
          timestamp: timeStamp
        });
      })
      .catch((error) => {
        this.catchError(error, res);
      });
  }

  deleteVideo(videoId, res) {
    const videos = Videos; // crear Videos() una vez (por lo de firebase initialize)
    videos.delete(videoId)
      .then(() => {
        res.status(OK_STATUS).json({status: OK_STATUS_STR});
      })
      .catch((error) => {
        this.catchError(error, res);
      });
  }
}

module.exports = VideosController


let mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: String,
  url: String,
  name: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('videos', videoSchema);

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String,
  name: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('videos', videoSchema);

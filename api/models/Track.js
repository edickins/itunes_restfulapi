const mongoose = require('mongoose');

const TrackSchema = mongoose.Schema({
  trackId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: false,
    trim: true,
  },
  artist: {
    type: String,
    required: false,
    trim: true,
  },
  albumArtist: {
    type: String,
    required: false,
    trim: true,
  },
  slug: String,
  album: {
    type: String,
    required: false,
    trim: true,
  },
  genre: String,
  trackNumber: Number,
  year: Number,
  playCount: Number,
  persistentId: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('Track', TrackSchema);

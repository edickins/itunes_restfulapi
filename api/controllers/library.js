const formidable = require('formidable');
const iTunesLibrary = require('../modules/loaders/itunesPlaylistGenerator.js');
const fs = require('fs-extra');
const camelCase = require('camelcase');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const mongoose = require('mongoose');

// @desc GET the entire library
// @route GET /api/v1/library
// @token public
exports.getLibrary = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get iTunes library` });
};

// @desc Create a new library
// @route POST /api/v1/library
// @token Private
exports.createLibrary = (req, res, next) => {
  fs.emptyDir('./uploads', err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('All files deleted from directory Successfully.');

    // create Formidable class to handle the uploaded formData
    const form = formidable({ uploadDir: './uploads' });

    //@err - Error object
    //@fields - Object - Any fields uploaded in the formData
    //@files - Object - Any files uploaded with the formData
    form.parse(req, (err, fields, files) => {
      if (err != null) {
        console.log(err);
        return res.status(400).json({ message: err.message });
      }

      getPlaylistsFromStream(files);
      getAllSongsFromStream(files);

      res.json({
        success: true,
        msg: `library created`,
        files: files,
      });
    });
  });
};

function getPlaylistsFromStream(files) {
  const getItunesPlaylists =
    require('@johnpaulvaughan/itunes-music-library-tracks').getItunesPlaylists;

  const playlists = [];

  // start the stream
  let trackStream = getItunesPlaylists(files.library.filepath);

  trackStream.on('data', function (playlist) {
    let jsonPlaylist = JSON.parse(playlist);
    playlists.push(normaliseObjectKeys(jsonPlaylist));
  });

  trackStream.on('error', function (err) {
    console.log(err);
  });

  trackStream.on('end', async () => {
    console.log('finished parsing xml stream');
    playlists.forEach(playlist => {
      console.log(`playlist.name ${playlist.name}`);
    });

    mongoose.connection.db.dropCollection('playlists', function (err, result) {
      if (!err) {
        console.log(result);
      } else {
        console.log(err.message);
      }
    });

    const playlist = await Playlist.insertMany(playlists);
    console.log('playlists added to database');
  });
}

//@desc read a stream that emits tracks. Normalise the keys into camel case and add them to tracks Array
function getAllSongsFromStream(files) {
  const getItunesTracks =
    require('@johnpaulvaughan/itunes-music-library-tracks').getItunesTracks;
  const tracks = [];

  // start the stream
  let trackStream = getItunesTracks(files.library.filepath);

  trackStream.on('data', function (track) {
    let jsonTrack = JSON.parse(track);
    tracks.push(normaliseObjectKeys(jsonTrack));
  });

  trackStream.on('error', function (err) {
    console.log(err);
  });

  trackStream.on('end', async () => {
    console.log('finished parsing xml stream');
    // Drop the 'foo' collection from the current database
    mongoose.connection.db.dropCollection('tracks', function (err, result) {
      if (!err) {
        console.log(result);
      } else {
        console.log(err.message);
      }
    });

    const playlist = await Track.insertMany(tracks);
    console.log('tracks added to database');
  });
}

function normaliseObjectKeys(obj) {
  let keys = Object.keys(obj);
  const values = Object.values(obj);

  keys = keys.map(key => {
    return camelCase(key);
  });

  const normalisedObj = {};
  keys.forEach((key, index) => {
    normalisedObj[key] = values[index];
  });

  return normalisedObj;
}

// files var returned from Formidable has this format
/*
    "files": {
        "library": {
            "size": 27550890,
            "filepath": "C:\\Users\\ECDICK~1\\AppData\\Local\\Temp\\c23357b5ea657a53db0619d00",
            "newFilename": "c23357b5ea657a53db0619d00",
            "mimetype": "application/xml",
            "mtime": "2022-05-23T13:29:23.363Z",
            "originalFilename": "Library.xml"
        }
    },
   */

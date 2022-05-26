const formidable = require('formidable');
const iTunesLibrary = require('../modules/loaders/itunesPlaylistGenerator.js');
const fs = require('fs-extra');
const camelCase = require('camelcase');

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
    playlists.push(JSON.parse(playlist));
  });

  trackStream.on('error', function (err) {
    console.log(err);
  });

  trackStream.on('end', () => {
    console.log('finished parsing xml stream');
    // console.log(playlists);
  });
}

function getAllSongsFromStream(files) {
  const getItunesTracks =
    require('@johnpaulvaughan/itunes-music-library-tracks').getItunesTracks;
  const tracks = [];

  // start the stream
  let trackStream = getItunesTracks(files.library.filepath);

  trackStream.on('data', function (track) {
    let jsonTrack = JSON.parse(track);

    let keys = Object.keys(jsonTrack);
    const values = Object.values(jsonTrack);

    keys = keys.map(key => {
      return camelCase(key);
    });

    console.log(keys);

    tracks.push(jsonTrack);
  });

  trackStream.on('error', function (err) {
    console.log(err);
  });

  trackStream.on('end', () => {
    console.log('finished parsing xml stream');
    console.log(tracks[0]);
  });
}

// files has this format
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

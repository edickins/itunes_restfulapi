const formidable = require('formidable');
const iTunesLibrary = require('../modules/loaders/itunesPlaylistGenerator.js');

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
  const form = formidable({ uploadDir: './uploads' });
  // Parse `req` and upload all associated files
  form.parse(req, (err, fields, files) => {
    if (err != null) {
      console.log(err);
      return res.status(400).json({ message: err.message });
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

    const { size, originalFilename } = files.library;

    res.json({
      success: true,
      msg: `library created`,
      files: files,
    });
  });
};

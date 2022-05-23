const formidable = require('formidable');

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
  const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, (err, fields, files) => {
    if (err != null) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }

    res.json({
      success: true,
      msg: `library created`,
      files: files,
    });
  });
};

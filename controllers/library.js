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
  res.status(201).json({ success: true, msg: `library created` });
};

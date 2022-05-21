// @desc GET all songs
// @route GET /api/v1/songs
// @token public
exports.getSongs = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all songs` });
};

// @desc GET a single song
// @route GET /api/v1/songs/:id
// @token public
exports.getSong = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get song with id ${req.params.id}` });
};

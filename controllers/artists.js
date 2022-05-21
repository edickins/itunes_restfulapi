// @desc GET all artists
// @route GET /api/v1/artists
// @token public
exports.getArtists = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all artists` });
};

// @desc GET a single artists
// @route GET /api/v1/artists/:id
// @token public
exports.getArtist = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get artist with id ${req.params.id}` });
};

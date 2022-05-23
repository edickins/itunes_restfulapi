// @desc GET all albums
// @route GET /api/v1/albums
// @token public
exports.getAlbums = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all albums` });
};

// @desc GET a single album
// @route GET /api/v1/albums:/id
// @token public
exports.getAlbum = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get album with id ${req.params.id}` });
};

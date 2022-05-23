// @desc GET all playlists
// @route GET /api/v1/playlists
// @token public
exports.getPlaylists = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all playlists` });
};

// @desc GET a single playlist
// @route GET /api/v1/playlists/:id
// @token public
exports.getPlaylist = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `get playlist with id ${req.params.id}` });
};

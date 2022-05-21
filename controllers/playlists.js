exports.getPlaylists = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all playlists` });
};

exports.getPlaylist = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `get playlist with id ${req.params.id}` });
};

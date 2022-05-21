exports.getAlbums = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all albums` });
};

exports.getAlbum = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get album with id ${req.params.id}` });
};

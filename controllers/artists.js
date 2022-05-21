exports.getArtists = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all artists` });
};

exports.getArtist = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get artist with id ${req.params.id}` });
};

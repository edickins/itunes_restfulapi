exports.getSongs = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all songs` });
};

exports.getSong = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get song with id ${req.params.id}` });
};

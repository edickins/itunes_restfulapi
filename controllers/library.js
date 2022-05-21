exports.getLibrary = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get iTunes library` });
};

exports.createLibrary = (req, res, next) => {
  res.status(201).json({ success: true, msg: `library created` });
};

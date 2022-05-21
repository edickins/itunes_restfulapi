const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ success: true, msg: `get all playlists` });
});

router.route('/:id').get((req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `get playlist with id ${req.params.id}` });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ success: true, msg: `get all albums` });
});

router.route('/:id').get((req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `get album with id ${req.params.id}` });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ success: true, msg: `get iTunes library` });
});

router.route('/').post((req, res) => {
  res.status(201).json({ success: true, msg: `library added` });
});

module.exports = router;

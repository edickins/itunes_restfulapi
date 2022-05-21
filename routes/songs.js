const express = require('express');
const router = express.Router();
const { getSongs, getSong } = require('../controllers/songs');

router.route('/').get(getSongs);

router.route('/:id').get(getSong);

module.exports = router;

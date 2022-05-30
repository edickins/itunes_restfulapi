const express = require('express');
const router = express.Router();
const { getTracks, getTrack } = require('../controllers/tracks');

router.route('/').get(getTracks);

router.route('/:id').get(getTrack);

module.exports = router;

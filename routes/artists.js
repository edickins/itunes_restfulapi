const express = require('express');
const router = express.Router();
const { getArtist, getArtists } = require('../controllers/artists');

router.route('/').get(getArtists);

router.route('/:id').get(getArtist);

module.exports = router;

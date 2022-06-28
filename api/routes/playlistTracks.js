const express = require('express');
const router = express.Router();
const { getPlaylistTracks } = require('../controllers/playlistTracks');

router.route('/:id').get(getPlaylistTracks);

module.exports = router;

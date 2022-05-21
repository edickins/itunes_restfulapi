const express = require('express');
const router = express.Router();
const { getPlaylists, getPlaylist } = require('../controllers/playlists');

router.route('/').get(getPlaylists);

router.route('/:id').get(getPlaylist);

module.exports = router;

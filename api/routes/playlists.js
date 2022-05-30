const express = require('express');
const router = express.Router();
const {
  getPlaylists,
  getPlaylist,
  createPlaylist,
} = require('../controllers/playlists');

router.route('/').get(getPlaylists);

router.route('/:id').get(getPlaylist);

router.route('/').post(createPlaylist);

module.exports = router;

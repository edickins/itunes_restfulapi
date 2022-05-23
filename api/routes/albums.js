const express = require('express');
const router = express.Router();

const { getAlbums, getAlbum } = require('../controllers/albums');

router.route('/').get(getAlbums);

router.route('/:id').get(getAlbum);

module.exports = router;

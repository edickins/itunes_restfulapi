const express = require('express');
const router = express.Router();
const { getLibrary, createLibrary } = require('../controllers/library');

router.route('/').get(getLibrary);

router.route('/').post(createLibrary);

module.exports = router;

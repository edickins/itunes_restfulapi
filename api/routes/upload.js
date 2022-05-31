const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/upload');

router.route('/').post(uploadFile);

module.exports = router;

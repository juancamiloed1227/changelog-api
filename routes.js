const express = require('express');
const router = express.Router();
const server = require('./server');

// Mount the API routes
router.use('/', server);

module.exports = router;

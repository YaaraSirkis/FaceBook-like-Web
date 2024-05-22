const tokenController = require('../controllers/token');
const express = require('express');
const router = express.Router();

router.post('/', tokenController.createToken);
module.exports = router;
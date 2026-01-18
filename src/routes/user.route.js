const express = require('express');
const router = express.Router();

const UserController = require('../controller/USerController.js');

router.post('/register', UserController.register);

module.exports = router;

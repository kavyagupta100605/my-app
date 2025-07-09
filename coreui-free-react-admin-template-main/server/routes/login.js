const express = require('express');
const router = express.Router();
const { createLogin} = require('../controllers/login');

router.post('/', createLogin);
module.exports = router;

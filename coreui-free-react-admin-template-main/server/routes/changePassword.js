const express = require('express');
const router = express.Router();
const { createPassword} = require('../controllers/changePassword')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/' , authMiddleware, createPassword);
module.exports = router;
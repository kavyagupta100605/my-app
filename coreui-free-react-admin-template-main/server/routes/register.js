const express = require('express');
const router = express.Router();
const {createuser} = require('../controllers/register');
router.post('/',createuser);
module.exports=router;
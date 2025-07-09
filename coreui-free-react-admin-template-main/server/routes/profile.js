const express = require('express');
const router = express.Router();
const {createprofile,getprofile} = require('../controllers/profile');
router.post('/',createprofile);
router.get('/',getprofile);
module.exports=router;
const express = require('express');
const router = express.Router();
const {createpurchaseentry,getpurchaseentry} = require('../controllers/purchaseentry');
router.post('/',createpurchaseentry);
router.get('/',getpurchaseentry);
module.exports=router;
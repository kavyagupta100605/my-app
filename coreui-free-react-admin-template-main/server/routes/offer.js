const express = require('express');
const router = express.Router();
const {createoffer,getoffer,deleteoffer,updateoffer} = require('../controllers/offer');

router.post('/',createoffer);
router.get('/',getoffer);
router.delete('/:id',deleteoffer);
router.put('/:id', updateoffer);
module.exports=router;
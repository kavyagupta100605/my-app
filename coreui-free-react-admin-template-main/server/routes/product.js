const express = require('express');
const router = express.Router();
const {createproduct,getproduct,deleteproduct,updateproduct} = require('../controllers/product');

router.post('/',createproduct);
router.get('/',getproduct);
router.delete('/:id',deleteproduct);
router.put('/:id', updateproduct);
module.exports=router;
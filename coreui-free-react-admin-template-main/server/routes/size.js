const express = require('express');
const router = express.Router();
const {createsize,getsize,deletesize,updatesize} = require('../controllers/size');

router.post('/',createsize);
router.get('/:id',getsize);
router.delete('/:id',deletesize);
router.put('/:id', updatesize);
module.exports=router;
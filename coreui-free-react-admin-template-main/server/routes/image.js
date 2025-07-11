const express = require('express');
const router = express.Router();
const {createimage,getimage,deleteimage,updateimage} = require('../controllers/image');

router.post('/',createimage);
router.get('/:id',getimage);
router.delete('/:id',deleteimage);
router.put('/:id', updateimage);
module.exports=router;
const express = require('express');
const router = express.Router();
const {createbrand,getbrand,deletebrand,updatebrand} = require('../controllers/brand');

router.post('/',createbrand);
router.get('/',getbrand);
router.delete('/:id',deletebrand);
router.put('/:id', updatebrand);
module.exports=router;
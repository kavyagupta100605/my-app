const express = require('express');
const router = express.Router();
const {createunits,getunits,deleteunits,updateunits} = require('../controllers/units');

router.post('/',createunits);
router.get('/',getunits);
router.delete('/:id',deleteunits);
router.put('/:id', updateunits);
module.exports=router;
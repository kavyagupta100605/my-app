const express = require('express');
const router = express.Router();
const {createpartymaster,getpartymaster,deletepartymaster,updatepartymaster} = require('../controllers/partymaster');

router.post('/',createpartymaster);
router.get('/',getpartymaster);
router.delete('/:id',deletepartymaster);
router.put('/:id', updatepartymaster);
module.exports=router;
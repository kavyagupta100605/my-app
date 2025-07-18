const express = require('express');
const router = express.Router();
const {createcategory,getcategory,deletecategory,updatecategory} = require('../controllers/category');
const { getparent } = require('../controllers/category');
const { getsub } = require('../controllers/category');
const { getsubsub } = require('../controllers/category');
router.post('/',createcategory);
router.get('/',getcategory);
router.get('/parent',getparent);
router.get('/sub/:id',getsub);
router.get('/subsub/:id',getsubsub);
router.delete('/:id',deletecategory);
router.put('/:id', updatecategory);
module.exports=router;
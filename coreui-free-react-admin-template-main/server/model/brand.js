// models/Brand.js

const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    trim: true,
  },
  since: {
    type: String,

  },
  Aboutbrand: {
    type: String,  
    default: null,
  },
  brandStatus: {
    type: String,  
  },
  brandLogo: {
  type: String,  
    default: null,
  },
 
}, {
  timestamps: true, 
});

const Brand = mongoose.model('Brand',BrandSchema);
module.exports = {Brand};

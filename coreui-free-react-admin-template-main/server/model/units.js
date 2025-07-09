// models/Brand.js

const mongoose = require('mongoose');

const UnitsSchema = new mongoose.Schema({
  unitName: {
    type: String,
    required: true,
  },
  unitSymbol: {
    type: String,

  },
  unitType: {
    type: String,  
    default: null,
  },
  conversionFactor: {
    type: String,  
  },
  status: {
  type: String,  
    default: null,
  },
 
}, {
  timestamps: true, 
});

const Units = mongoose.model('Units',UnitsSchema);
module.exports = {Units};

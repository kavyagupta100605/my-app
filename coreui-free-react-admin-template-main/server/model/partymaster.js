// models/Brand.js

const mongoose = require('mongoose');

const PartyMasterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
    address: {
    type: String,

  },
  mobile: {
    type: Number, 
  },
  gstno: {
    type: Number, 
  },
  opbal: {
    type: Number, 
  },
  baltype: {
    type: String, 
  },
  type: {
    type: String,  
  },
  status: {
  type: String,  
    default: null,
  },
 
}, {
  timestamps: true, 
});

const PartyMaster = mongoose.model('PartyMaster',PartyMasterSchema);
module.exports = {PartyMaster};

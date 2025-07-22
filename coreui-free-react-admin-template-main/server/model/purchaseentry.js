// models/Brand.js

const mongoose = require('mongoose');

const PurchaseEntrySchema = new mongoose.Schema({
  voucher: {
    type: String,
    required: true,
  },
    date: {
    type: Date,

  },
  gsttype: {
    type: String, 
  },
  gstno: {
    type: Number, 
  },
  discount: {
    type: Number, 
  },
  partyname: {
    type: String, 
  },
  partyid: {
    type: String, 
  },
  amount: {
  type: String,  
    default: null,
  },
  discount: {
    type: Number, 
  },
  status: {
    type: Number , 
  },
  transtype: {
    type: String,  
  },
 
}, {
  timestamps: true, 
});

const PurchaseEntry = mongoose.model('PurchaseEntry',PurchaseEntrySchema);
module.exports = {PurchaseEntry};

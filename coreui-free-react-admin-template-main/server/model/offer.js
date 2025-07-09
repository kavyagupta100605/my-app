// models/offer.js

const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  Offerid: {
    type: String,
    required: true,
    trim: true,
  },
  Offertitle: {
    type: String,

  },
  Offercode: {
    type: String,  
    default: null,
  },
  Offerpercentage: {
    type: String,  
  },
  Startdate: {
  type: Date,  
    default: null,
  },
  Enddate: {
  type: Date,  
    default: null,
  },
  Status: {
  type: String,  
    default: null,
  },

 
}, {
  timestamps: true, 
});

const Offer = mongoose.model('Offer',OfferSchema);
module.exports = {Offer};

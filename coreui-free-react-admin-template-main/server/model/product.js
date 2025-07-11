// models/Product.js

const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new mongoose.Schema({
  
  productName: {
    type: String,

  },
  brand: {
    type: String,

  },
   parentCategory: {
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true,
  },
   subCategory: {
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true,

  },
   ssCategory: {
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true,

  },
  description: {
    type: String,  
    default: null,
  },
  baseImage: {
    type: String,  
  },
  baseSize: {
  type: String,  
    default: null,
  },
  quantity: {
  type: Number,  
    default: null,
  },
  price: {
  type: Number,  
  },

 
}, {
  timestamps: true, 
});

const Product = mongoose.model('Product',ProductSchema);
module.exports = {Product};

// models/Category.js

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  categoryDescription: {
    type: String,

  },
  parentCategory: {
    type: String,  
    default: null,
  },
  subCategory: {
    type: String,  
    default: null,
  },
  categoryImage: {
    type: String,  
  },
  available: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes',
  },
}, {
  timestamps: true, 
});

const Category = mongoose.model('Category',CategorySchema);
module.exports = {Category};

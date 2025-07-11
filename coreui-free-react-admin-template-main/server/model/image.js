// models/Category.js

const mongoose = require('mongoose');
const {Schema} = mongoose;

const ImageSchema = new mongoose.Schema({
 
  baseImage: {
    type: String,  
  },
  pid:{
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true,
  },
  type:{
    type:String,
  },
  size:{
    type:String,
  },
  path:{
    type:String,
  }

 
}, {
  timestamps: true, 
});

const Image = mongoose.model('Image',ImageSchema);
module.exports = {Image};

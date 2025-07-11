// models/Category.js

const mongoose = require('mongoose');
const {Schema} = mongoose;

const SizeSchema = new mongoose.Schema({
 
  quantity: {
    type: Number,  
    
  },
  pid:{
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true,
  },
  price:{
    type:Number,
  },
  size:{
    type:String,
  },
  unit:{
    type:String,
  },
  stockQuant:{
    type:Number,
  }

 
}, {
  timestamps: true, 
});

const Size = mongoose.model('Size',SizeSchema);
module.exports = {Size};

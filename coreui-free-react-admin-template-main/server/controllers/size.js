const {Size} = require("../model/size");
const express = require("express");
const router = express.Router();
const multer = require("multer");






// CREATE brand
exports.createsize = async(req, res) => {
  

    
    const {
        unit,
        pid,
        quantity,
        price,
        size,
        stockQuant
    } = req.body;


    try {
      const newsize = await Size.create({
        unit,
        pid,
        quantity,
        price,
        size,
        stockQuant
      });

      res.status(201).json(newsize);
    } catch (err) {
      console.error("Error creating brand:", err);
      res.status(400).json({ error: err.message });
    }
  
};


// READ all categories
exports.getsize = async (req, res) => {
  
  try {
    const size = await Size.find({pid:req.params.id})
      .populate('pid','productName');
    
    res.status(200).json(size);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.deletesize = async(req,res) => {
  try{
    await Size.findByIdAndDelete(req.params.id);
    res.json({message: 'Deleted Successfully'});
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error: "Failed to delete"});
  }
}

exports.updatesize = async (req, res) => { 

  
    
     
      const update = await Size.findByIdAndUpdate(req.params.id, req.body, { new: 
  true }); 
      res.json(update); 
  
}; 
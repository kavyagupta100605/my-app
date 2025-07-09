const {Product} = require("../model/product");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer storage config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.fieldname + "-" + Date.now() + ".jpg")
});



const upload = multer({ storage }).single("baseImage");

// CREATE brand
exports.createproduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed", details: err.message });
    }

    const image = req.file ? req.file.filename : "noimage.jpg";
    const {
      productName,
      parentCategory,
      subCategory,
      ssCategory,
      description,
      baseSize,
      quantity,
      price
    } = req.body;


    try {
      const newproduct = await Product.create({
      productName,
      parentCategory,
      subCategory,
      ssCategory,
      description,
      baseSize,
      quantity,
      price,
      baseImage:image
      });

      res.status(201).json(newproduct);
    } catch (err) {
      console.error("Error creating brand:", err);
      res.status(400).json({ error: err.message });
    }
  });
};


// READ all categories
exports.getproduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('parentCategory', 'categoryName')  // Only fetch the 'name' field from Category
      .populate('subCategory', 'categoryName')    // Same for subcategory
      .populate('ssCategory', 'categoryName')    // Same for subcategory
    console.log(products);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.deleteproduct = async(req,res) => {
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: 'Deleted Successfully'});
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error: "Failed to delete"});
  }
}

exports.updateproduct = async (req, res) => { 
  upload(req,res,async(err)=>{
  
    
     
      const update = await Product.findByIdAndUpdate(req.params.id, req.body, { new: 
  true }); 
      res.json(update); 
  })
}; 
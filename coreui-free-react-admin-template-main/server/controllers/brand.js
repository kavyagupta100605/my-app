const {Brand} = require("../model/brand");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer storage config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.fieldname + "-" + Date.now() + ".jpg")
});



const upload = multer({ storage }).single("brandLogo");

// CREATE brand
exports.createbrand = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed", details: err.message });
    }

    const image = req.file ? req.file.filename : "noimage.jpg";
    const {
      brandName,
      since,
      Aboutbrand,
      brandStatus,
    } = req.body;


    try {
      const newbrand = await Brand.create({
        brandName,
        since,
        Aboutbrand,
        brandStatus,
        brandLogo: image,
      });

      res.status(201).json(newbrand);
    } catch (err) {
      console.error("Error creating brand:", err);
      res.status(400).json({ error: err.message });
    }
  });
};


// READ all categories
exports.getbrand = async (req, res) => {
  try {
    const categories = await Brand.find();
    
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.deletebrand = async(req,res) => {
  try{
    await Brand.findByIdAndDelete(req.params.id);
    res.json({message: 'Deleted Successfully'});
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error: "Failed to delete"});
  }
}

exports.updatebrand = async (req, res) => { 
  upload(req,res,async(err)=>{
    
    console.log(req.body)
    console.log("text")
      const update = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: 
  true }); 
      res.json(update); 
  })
}; 
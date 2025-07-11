const {Image} = require("../model/image");
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
exports.createimage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed", details: err.message });
    }

    const image = req.file ? req.file.filename : "noimage.jpg";
    const {
        pid,
        type
    } = req.body;


    try {
      const newimage = await Image.create({
       pid,
      type,
      baseImage:image
      });

      res.status(201).json(newimage);
    } catch (err) {
      console.error("Error creating brand:", err);
      res.status(400).json({ error: err.message });
    }
  });
};


// READ all categories
exports.getimage = async (req, res) => {
  
  try {
    const image = await Image.find({pid:req.params.id})
      .populate('pid','productName');
    
    res.status(200).json(image);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.deleteimage = async(req,res) => {
  try{
    await Image.findByIdAndDelete(req.params.id);
    res.json({message: 'Deleted Successfully'});
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error: "Failed to delete"});
  }
}

exports.updateimage = async (req, res) => { 
  upload(req,res,async(err)=>{
  
    
     
      const update = await Image.findByIdAndUpdate(req.params.id, req.body, { new: 
  true }); 
      res.json(update); 
  })
}; 
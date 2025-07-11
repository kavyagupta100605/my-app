const {PartyMaster} = require("../model/partymaster");
const express = require("express");
const router = express.Router();
const multer = require("multer");






// CREATE brand
exports.createpartymaster = async(req, res) => {
  

    
    const {
       name,
       address,
       mobile,
       gstno,
       type,
       status,
       opbal,
       baltype
    } = req.body;


    try {
      const newPartyMaster = await PartyMaster.create({
        name,
       address,
       mobile,
       gstno,
       type,
       status,
       opbal,
       baltype
      });

      res.status(201).json(newPartyMaster);
    } catch (err) {
      console.error("Error creating brand:", err);
      res.status(400).json({ error: err.message });
    }
  
};


// READ all categories
exports.getpartymaster = async (req, res) => {
  
  try {
    const PartyMaster1 = await PartyMaster.find();
    
    res.status(200).json(PartyMaster1);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.deletepartymaster = async(req,res) => {
  try{
    await PartyMaster.findByIdAndDelete(req.params.id);
    res.json({message: 'Deleted Successfully'});
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error: "Failed to delete"});
  }
}

exports.updatepartymaster = async (req, res) => { 

  
    
     
      const update = await PartyMaster.findByIdAndUpdate(req.params.id, req.body, { new: 
  true }); 
      res.json(update); 
  
}; 
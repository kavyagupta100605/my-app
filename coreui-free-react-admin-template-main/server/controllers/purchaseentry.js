const {PurchaseEntry} = require("../model/purchaseentry");
const express = require("express");
const router = express.Router();





// CREATE brand
exports.createpurchaseentry = async(req, res) => {
  

    
    const {
       voucher,
       date,
       gsttype,
       partyname,
       partyid,
       amount,
       discount,
       status,
       transtype,
       gstno
    } = req.body;


    try {
      const newPurchaseEntry = await PurchaseEntry.create({
        voucher,
       date,
       gsttype,
       partyname,
       partyid,
       amount,
       discount,
       status,
       transtype,
       gstno
      });

      res.status(201).json(newPurchaseEntry);
    } catch (err) {
      console.error("Error creating brand:", err);
      res.status(400).json({ error: err.message });
    }
  
};


// READ all categories
exports.getpurchaseentry = async (req, res) => {
  
  try {
    const PurchaseEntry1 = await PurchaseEntry.find();
    
    res.status(200).json(PurchaseEntry1);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};


const {Profile} = require("../model/profile");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.fieldname + "-" + Date.now() + ".jpg")
});

const upload = multer({ storage }).single("image");

//CREATE
exports.createprofile = async (req,res) => {
    upload(req, res, async function (err){
        if(err) return res.status(500).json({ error: "Image upload failed"});
    const image = req.file ? req.file.filename : "noimage.jpg";

    const{name,tele,gender,qual,date,email} = req.body;
    try{
        const prof = await Profile.create({name,tele,gender,qual,date,image,email});
        res.status(200).json(prof);
    } catch(err){
        console.log(err);
        res.status(400).json({error: err.message});
    }

    
});
}

//READ
exports.getprofile = async (req,res) => {
    const {email} = req.query;
    const user = await Profile.findOne({email});
    res.json(user);
}
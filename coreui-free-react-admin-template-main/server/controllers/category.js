const {Category} = require("../model/category");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer storage config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.fieldname + "-" + Date.now() + ".jpg")
});



const upload = multer({ storage }).single("categoryImage");

// CREATE Category
exports.createcategory = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed", details: err.message });
    }

    const image = req.file ? req.file.filename : "noimage.jpg";
    const {
      categoryName,
      categoryDescription,
      parentCategory,
      subCategory,
      available,
    } = req.body;


    try {
      const newCategory = await Category.create({
        categoryName,
        categoryDescription,
        parentCategory,
        subCategory,
        available,
        categoryImage: image,
      });

      res.status(201).json(newCategory);
    } catch (err) {
      console.error("Error creating category:", err);
      res.status(400).json({ error: err.message });
    }
  });
};


// READ all categories
exports.getcategory = async (req, res) => {
  try {
    // const categories = await Category.find();
   const categories = await Category.aggregate([
  {
    $addFields: {
      parentCategoryId: {
        $cond: {
          if: {
            $or: [
              { $eq: ['$parentCategory', null] },
              { $eq: ['$parentCategory', '0'] },
              { $eq: ['$parentCategory', 0] },
              { $eq: ['$parentCategory', '']}
            ]
          },
          then: null,
          else: { $toObjectId: '$parentCategory' }
        }
      },
      subCategoryId: {
        $cond: {
          if: {
            $or: [
              { $eq: ['$subCategory', null] },
              { $eq: ['$subCategory', '0'] },
              { $eq: ['$subCategory', 0] },
              { $eq: ['$subCategory', '']}
            ]
          },
          then: null,
          else: { $toObjectId: '$subCategory' }
        }
      }
    }
  },
  {
    $lookup: {
      from: 'categories', // collection name (plural)
      localField: 'parentCategoryId',
      foreignField: '_id',
      as: 'parentCategoryInfo'
    }
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'subCategoryId',
      foreignField: '_id',
      as: 'subCategoryInfo'
    }
  },
  {
    $addFields: {
      parentCategoryName: {
        $cond: [
          { $gt: [{ $size: '$parentCategoryInfo' }, 0] },
          { $arrayElemAt: ['$parentCategoryInfo.categoryName', 0] },
          null
        ]
      },
      subCategoryName: {
        $cond: [
          { $gt: [{ $size: '$subCategoryInfo' }, 0] },
          { $arrayElemAt: ['$subCategoryInfo.categoryName', 0] },
          null
        ]
      }
    }
  },
  {
    $project: {
      parentCategoryInfo: 0,
      subCategoryInfo: 0,
      parentCategoryId: 0,
      subCategoryId: 0
    }
  }
]);

console.log(categories)
    
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
exports.getparent = async (req, res) => {
  try {
    const categories = await Category.find({parentCategory:0,subCategory:0});
    
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
// Sub
exports.getsub = async (req, res) => {
  try {
      if(req.params.id==0) return res.status(200).json([])
        const categories = await Category.find({parentCategory:req.params.id,subCategory:0});
        res.status(200).json(categories);
        

  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
// Sub Sub
exports.getsubsub = async (req, res) => {
  try {
      if(req.params.id==0) return res.status(200).json([])
        const categories = await Category.find({subCategory:req.params.id});
        res.status(200).json(categories);
        

  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
exports.deletecategory = async(req,res) => {
  try{
    await Category.findByIdAndDelete(req.params.id);
    res.json({message: 'Deleted Successfully'});
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error: "Failed to delete"});
  }
}

exports.updatecategory = async (req, res) => { 
  upload(req,res,async(err)=>{
  
    
     
      const update = await Category.findByIdAndUpdate(req.params.id, req.body, { new: 
  true }); 
      res.json(update); 
  })
}; 
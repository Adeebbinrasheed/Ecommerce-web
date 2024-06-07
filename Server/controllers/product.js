const Product = require("../models/Product");
const {rm}=require('fs')

const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "unauthorized" });

    const { title, description, category, price, stock } = req.body;
    const image = req.file;
    if (!image) {
      return res.status(400).json({ message: "please give image" });
    }

    const product = await Product.create({
      title,
      description,
      category,
      price,
      stock,
      image: image.path,
    });

    return res.status(201).json({ message: "product created", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const { search, category, price, page } = req.query; //filtering products

    const filter = {};
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (price) {
      filter.price = {
        $gte: Number(price),
      };
    }

    if (category) {
      filter.category = category;
    }

    const countProduct = await Product.countDocuments(); //give how many products

    const limit = 4;

    const skip = (page - 1) * limit;

    const totalpages = Math.ceil(countProduct / limit);

    const products = await Product.find(filter)
      .sort("-createdAt")
      .limit(limit)
      .skip(skip);

    const categories = await Product.distinct("category");

    const mostSelling = await Product.find().sort({ sold: -1 }).limit(3);

    res.status(201).json({ products, totalpages, categories, mostSelling });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStock=async(req,res)=>{
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "unauthorized" });
    const product=await Product.findById(req.params.id)

    if(req.body.stock){
      product.stock=req.body.stock
      await product.save()
      return res.status(201).json({message:'stock updated'})
    }

    return res.status(400).json({message:'please give stock'})
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteProduct=async(req,res)=>{
  try {

    if (req.user.role !== "admin")
      return res.status(403).json({ message: "unauthorized" });
    const product=await Product.findById(req.params.id)
    rm(product.image,()=>console.log('image deleted'))

    await product.deleteOne()
    res.json({message:'product deleted'})

    
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createProduct, fetchProducts, fetchSingleProduct,updateStock ,deleteProduct};

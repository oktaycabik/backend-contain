const Product = require("../models/Product");
const asyncErrorWrapper=require("express-async-handler")


const CustomError = require("../helpers/error/customError");
const newProduct =asyncErrorWrapper( async (req, res, next) => {
  
   const {name,category,price}=req.body;
  const product = await Product.create({
    name,
    category,
    price
  });
   res.status(200).json({
    product,
    
   })
} );
const getAllProduct =asyncErrorWrapper( async (req, res, next) => {
  const products =await Product.find().populate({
    path:"category"
  })
  res.json({
    success:true,
    products
  })
})
const getByCategory =asyncErrorWrapper( async (req, res, next) => {
  const {id} =req.params
  console.log('id', id)
  const products =await Product.find({"category":id}).populate({
    path:"category"
  })
  res.json({
    success:true,
    products
  })
})


module.exports = {
  newProduct,
  getAllProduct,
  getByCategory
};

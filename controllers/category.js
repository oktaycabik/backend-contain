const Category = require("../models/Category");
const asyncErrorWrapper=require("express-async-handler")


const CustomError = require("../helpers/error/customError");
const newCategory =asyncErrorWrapper( async (req, res, next) => {
  
   const {name}=req.body;
  const category = await Category.create({
    name
  });
   res.status(200).json({
    category,
    
   })
} );

module.exports = {
    newCategory,
    
  
  };
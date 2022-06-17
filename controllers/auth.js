const User = require("../models/User");
const asyncErrorWrapper=require("express-async-handler")
const {validateUserInput,comparePassword}=require("../helpers/authorization/inputHelpers")
const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers")
const CustomError = require("../helpers/error/customError");
const register =asyncErrorWrapper( async (req, res, next) => {
  
   const {name,email,password,role,username}=req.body;
  const user = await User.create({
    username,
    name,
    email,
    password, 
    role,
  });
  sendJwtToClient(user,res)
  
} );
const getUser= asyncErrorWrapper(async (req,res,next) => {
  const id=req.params.id
 const user=await User.findById(id).populate({
   path:"posts",
   select:"content comments likes image"
   
 })
 res.status(200).json({
   success:true,
   user
 })
})
const login = asyncErrorWrapper(async (req,res,next) => {

  const {email,password} = req.body;
  
  if(!validateUserInput(email,password)) {
      return next(new CustomError("Please check your inputs",400));
  }
  
  const user = await User.findOne({email}).select("+password");

  if ( !user || !comparePassword(password,user.password)) {
      
      return next(new CustomError("Please check your credentials",404));
  }


  sendJwtToClient(user,res,200);
  

});

const logout = asyncErrorWrapper(async (req,res,next) =>{
   
  const {NODE_ENV} = process.env;
  
  // Send To Client With Res
  
  return res
  .status(200)
  .cookie("token",null, {
      httpOnly : true,
      expires : new Date(Date.now()),
      secure : NODE_ENV === "development" ? false : true
  })
  .json({
      success : true,
      message : "Logout Successfull"
  });
  
});
const follow = asyncErrorWrapper(async (req,res,next) =>{
  const id = req.user.id 
  const currentUser = await User.findById(id)
  const user = await User.findById(req.body.userId)
  if(currentUser.followings.includes(req.body.userId)){
    res.status(400).json({
      success:false,
      message:"zaten takip ediyorsun"
    })
  }else{
    await currentUser.updateOne({$push:{followings:req.body.userId}})
    await user.updateOne({$push:{followers:id}})
    await user.updateOne({$push:{notifications:{info:"fallow"}}})
    res.status(200).json({
      user:req.body.userId,
  
    })
  }
 
});
const unFollow = asyncErrorWrapper(async (req,res,next) =>{
  const id = req.user.id 
  const currentUser = await User.findById(id)
  const user = await User.findById(req.body.userId)
  if(!currentUser.followings.includes(req.body.userId)){
    res.status(400).json({
      success:false,
      message:"zaten takip etmiyorsun"
    })
  }else{
    await currentUser.updateOne({$pull:{followings:req.body.userId}})
    await user.updateOne({$pull:{followers:id}})
  
    res.status(200).json({
      user:req.body.userId,
      
    })
  }
 
});
const getAllUsers = asyncErrorWrapper(async (req,res,next) =>{
  const users =await User.find()
  res.status(200).json({
    success:true,
    users
  })
})
const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  const {id}=req.params
 const user= await User.findByIdAndUpdate(req.user.id,{
  
    "profile_image":req.savedImage
  },{
    new:true,
  })

  res.json({
    success:true,
    message:"Image Upload Successfull",
    data:user
  })
})
module.exports = {
  register,
  getUser,
  login,
  follow,
  unFollow,
  logout,
  getAllUsers,
  imageUpload
};

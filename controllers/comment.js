const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");

const newComment = asyncErrorWrapper(async (req, res, next) => {
  const { user, content,post } = req.body;

  const comment = await Comment.create({
    user,
    post,
    content,
  });
  const findUser = await Post.findById(post);
 
  await findUser.updateOne({ $push: { comments: comment._id } });

  res.status(201).json({
    success: true,
    comment,
  });
});
const getPostComments = asyncErrorWrapper(async (req, res, next) => {
    const id =req.params.id 
    const comments=await Comment.find({"post":id}).populate({
      path:"user",
      select:"name username"
    })
     
    
    res.status(200).json({
        success:true,
        comments
    })
});
module.exports = {
  newComment,
  getPostComments
};

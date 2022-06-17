const Post = require("../models/Post");
const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/customError");

const newPost = asyncErrorWrapper(async (req, res, next) => {
  const { content,image } = req.body;
  const id =req.user.id

  const post = await Post.create({
    user:id,
    content,
    image
  });

  const findPost = await Post.findById(post._id).populate({
    path: "user",
    select: "username name",
  });
  const findAllUser = await User.find();

  const findUser = await User.findById(id);

  for (var i = 0; i < findAllUser.length; i++) {
    if (findUser.followers.includes(findAllUser[i]._id)) {
      await findAllUser[i].updateOne({
        $push: {
          notifications: {
            info: `In case you missed ${findUser.name}'s Tweet`,
            content: content,
          },
        },
      });
    }
  }
  await findUser.updateOne({ $push: { posts: post._id } });

  res.status(201).json({
    success: true,
    findPost,
   
  });
});
const getPost = asyncErrorWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: "user",
    select: "username name",
  });
  console.log('post', req.params.id)
  res.status(200).json({
    success: true,
    post,
  });
});
const getAllPost = asyncErrorWrapper(async (req, res, next) => {
  const posts = await Post.find().populate({
    path: "user",
    select: "username name",
  });
  res.status(200).json({
    success: true,
    posts,
  });
});
const getTimeLinePost = asyncErrorWrapper(async (req, res, next) => {
  let postsUser = [];

  const id = req.user.id;

  const user = await User.findById(id);
  let posts = await Post.find().populate({
    path: "comments user",
    select: "name username content",
  });
  let myPosts = await Post.find({"user":id}).populate({
    path: "comments user",
    select: "name username content",
  });

  const friendPost = user.followings;
  for (var i = 0; i < friendPost.length; i++) {
    let p = posts.filter((p) => p?.user?._id == friendPost[i]);
    postsUser.push(p);
  }
  postsUser.push(myPosts);
  let myFriendPost = postsUser.flat();
  myFriendPost = myFriendPost.sort().reverse();
  // myFriendPost = myFriendPost.map((p) => {
  //   return {
  //     _id: p._id,
  //     name: p.user.name,
  //     username: p.user.name,
  //     likes: p.likes,
  //     comments: p.comments,
  //     content: p.content,
  //   };
  // });
  res.status(200).json({
    posts: myFriendPost,
  });
});
const likePost = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const post = await Post.findById(id);

  const findUser = await User.findById(post.user);
  const currentUser = await User.findById(userId);

  if (post.likes.includes(userId)) {
    return next(new CustomError("alredy access like post"));
  }
  post.likes.push(userId);
  post.save();
  await findUser.updateOne({
    $push: {
      notifications: {
        info: `${currentUser.name} liked your post`,
        content: post.content,
      },
    },
  });

  res.status(200).json({
    message: true,
    userId,
    id,
  });
});
const unlikePost = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post.likes.includes(userId)) {
    return next(new CustomError("alredy access like post"));
  }
  const index = post.likes.indexOf(userId);

  post.likes.splice(index, 1);
  post.save();

  res.status(200).json({
    message: true,
    userId,
    id,
  });
});
const imageUploads = asyncErrorWrapper(async (req, res, next) => {
  const {id}=req.params
 const user= await Post.findByIdAndUpdate(id,{
  
    "image":req.savedImages
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
  newPost,
  getPost,
  getAllPost,
  getTimeLinePost,
  likePost,
  unlikePost,
  imageUploads
};

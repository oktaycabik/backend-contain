const express = require("express");
const {newPost,getPost, getAllPost,getTimeLinePost, likePost, unlikePost,imageUploads} =require("../controllers/post")
const router = express.Router();
const {getAccessToRoute}=require("../middlewares/authorization/auth");
const {photoUploads} = require("../middlewares/libraries/multer");

router.post("/",getAccessToRoute,newPost );
router.get("/",getAllPost );
router.get("/:id",getPost );
router.get("/:id/like",getAccessToRoute,likePost );
router.get("/:id/unlike",getAccessToRoute,unlikePost );

router.get("/timeline/posts",getAccessToRoute,getTimeLinePost );
module.exports = router;
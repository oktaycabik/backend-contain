const express = require("express");
const {newPost,getPost, getAllPost,getTimeLinePost, likePost, unlikePost} =require("../controllers/post")
const router = express.Router();
const {getAccessToRoute}=require("../middlewares/authorization/auth");


router.post("/",getAccessToRoute,newPost );
router.get("/",getAllPost );
router.get("/:id",getPost );
router.get("/:id/like",getAccessToRoute,likePost );
router.get("/:id/unlike",getAccessToRoute,unlikePost );

router.get("/timeline/posts",getAccessToRoute,getTimeLinePost );
module.exports = router;
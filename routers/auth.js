const express = require("express");
const {register,getUser,login,logout,follow,getAllUsers, unFollow, imageUpload} =require("../controllers/auth")
const router = express.Router();
const {getAccessToRoute}=require("../middlewares/authorization/auth");
const {photoUpload} = require("../middlewares/libraries/multer");

router.post("/register",register );
router.post("/login",login );
router.post("/follow",getAccessToRoute,follow );
router.post("/unfollow",getAccessToRoute,unFollow );
router.get("/logout",getAccessToRoute,logout );
router.get("/getall",getAllUsers );
router.get("/:id/profile",getUser );
router.post("/upload",getAccessToRoute,photoUpload.single("profile_image"),imageUpload)
module.exports = router;

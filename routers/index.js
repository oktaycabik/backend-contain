const express =require("express")
const auth =require("./auth")
const post =require("./post")
const comment =require("./comment")
const router =express.Router();

router.use("/auth",auth)
router.use("/post",post)
router.use("/comment",comment)

module.exports=router;
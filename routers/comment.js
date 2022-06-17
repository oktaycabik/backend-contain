const express = require("express");
const { newComment, getPostComments } = require("../controllers/comment");

const router = express.Router();
const {getAccessToRoute}=require("../middlewares/authorization/auth")

router.post("/",newComment );
router.get("/:id/post",getPostComments );
module.exports = router;
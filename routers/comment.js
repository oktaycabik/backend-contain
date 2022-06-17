const express = require("express");
const { newComment, getPostComments } = require("../controllers/comment");

const router = express.Router();


router.post("/",newComment );
router.get("/:id/post",getPostComments );
module.exports = router;
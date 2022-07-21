const express = require("express");

const { newCategory } = require("../controllers/category");
const router = express.Router();


router.post("/",newCategory );


module.exports = router;
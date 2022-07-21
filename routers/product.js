const express = require("express");

const { newProduct, getAllProduct, getByCategory } = require("../controllers/product");
const router = express.Router();


router.post("/",newProduct );
router.get("/",getAllProduct );
router.get("/:id",getByCategory)
module.exports = router;

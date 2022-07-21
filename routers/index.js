const express =require("express")
const product =require("./product")
const category =require("./category")
const router =express.Router();

router.use("/product",product)
router.use("/category",category)


module.exports=router;
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routers = require("./routers/index");
const errorHandler = require("./middlewares/errors/errorHandler");
const cors = require("cors");
const path = require("path")
const multer =require("multer")
const app = express();
//Environment Veriables

app.use(express.json());
dotenv.config({
  path: "./config/env/config.env",
});
app.use(express.static(path.join(__dirname,"public")))
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Db Connected");
});
const PORT = process.env.PORT;
app.use(cors());
const storage=multer.diskStorage({
  destination: (req,file,cb) =>{
     cb(null,"public/images")
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
});
const upload=multer({storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try {
    return res.status(200).json("File uploaded successfuly.")
  } catch (error) {
    console.log('error', error)
  }
})
app.use("/api", routers);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app started on ${PORT}:${process.env.NODE_ENV}`);
});

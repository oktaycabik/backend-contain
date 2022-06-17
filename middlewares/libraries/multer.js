const multer = require("multer");
const path = require("path");

const CustomError = require("../../helpers/error/customError");


const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));

    },
    filename : function(req,file,cb){
        const {id}=req.params
        const extension = file.mimetype.split("/")[1];
        req.savedImage = "image_" + req.user.id + "." + extension;
        cb(null,req.savedImage);
    }

});

const fileFilter = (req,file,cb) => {
    allowedTypes = ["image/jpg","image/gif","image/jpeg","image/png"];

    if (!allowedTypes.includes(file.mimetype)){
        return cb(new CustomError("Please provide a valid image file",400),false);
        
    }
    return cb(null,true);

}

const storages = multer.diskStorage({
    destination : function(req,file,cb) {
        
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));

    },
    filename : function(req,file,cb){
        const {id}=req.params
        const extension = file.mimetype.split("/")[1];
        req.savedImages = "image_" + req.user.id+"2" + "." + extension;
        cb(null,req.savedImages);
    }

});

const fileFilters = (req,file,cb) => {
    allowedTypes = ["image/jpg","image/gif","image/jpeg","image/png"];

    if (!allowedTypes.includes(file.mimetype)){
        return cb(new CustomError("Please provide a valid image file",400),false);
        
    }
    return cb(null,true);

}

const photoUpload = multer({storage,fileFilter});
const photoUploads = multer({storages,fileFilters});

module.exports = {
    photoUpload,
    photoUploads,
}
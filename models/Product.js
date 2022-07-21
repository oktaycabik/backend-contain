const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  category: 
    {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
 
 
});

module.exports = mongoose.model("Product", ProductSchema);

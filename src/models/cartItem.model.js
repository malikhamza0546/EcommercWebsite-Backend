const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const CartItemSchema = new mongoose.Schema({
    CartItem: {
        type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId declaration
        ref: "Cart", // Correctly reference the "User" model
        required: true // Corrected the typo "require" to "required"
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId declaration
        ref:"products",
        required:true
    }],
    size:{
        type:String,
        required:true,
       
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true,
       
    },
    discountedPrice:{
        type:Number,
        required:true,
       
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId declaration
        ref:"User",
        required:true
    }
});

const CartItem = mongoose.model("CartItem", CartItemSchema); // Corrected the model name to "Cart"
module.exports = CartItem; // Export the Cart model

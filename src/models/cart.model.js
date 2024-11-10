const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId declaration
        ref: "User", // Correctly reference the "User" model
        required: true // Corrected the typo "require" to "required"
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId declaration
        ref: "CartItem",
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalItems: {
        type: Number,
        required: true,
        default: 0
    },
    totalDiscountPrice: {
        type: Number,
        required: true,
        default: 0
    },
    discounts: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model("Cart", CartSchema); // Corrected the model name to "Cart"
module.exports = Cart; // Export the Cart model

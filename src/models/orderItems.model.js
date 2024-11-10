const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        requied: true
    },
    size: {
        type: String,
        requied: true
    },
    quantity: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

const orderItems = mongoose.model("orderItems", orderItemSchema); // Corrected the model name to "Cart"
module.exports = orderItems; // Export the Cart model

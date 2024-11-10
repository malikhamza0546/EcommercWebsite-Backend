const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const reviewsSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true

    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

const reviews = mongoose.model("reviews", reviewsSchema); // Corrected the model name to "Cart"
module.exports = reviews; // Export the Cart model

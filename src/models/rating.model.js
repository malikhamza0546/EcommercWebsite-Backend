const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    rating: {
        type: Number,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

const rating = mongoose.model("rating", ratingSchema); // Corrected the model name to "Cart"
module.exports = rating; // Export the Cart model

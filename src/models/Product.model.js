const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false

    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true

    },
    discountPrice: {
        type: Number,

    },
    discountPresent: {
        type: Number,

    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String
    },
    color: {
        type: String
    },
    sizes: [{
        name: {
            type: String
        },
        quantity: {
            type: Number
        }
    }],
    imageUrl: { type: String },
    // ratings: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "rating"
    // }],
    // reviews: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "reviews"
    // }],
    numRatings: {
        type: Number,
        default: 0
    },

    category1: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    // category2: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    // category3: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // }


});

const Product = mongoose.model("Product", ProductSchema); // Corrected the model name to "Cart"
module.exports = Product; // Export the Cart model

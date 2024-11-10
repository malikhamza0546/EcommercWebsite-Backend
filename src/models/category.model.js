const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    level: {
        type: Number,
        required: true
    }

});

const Category = mongoose.model("categories", categorySchema); // Corrected the model name to "Cart"
module.exports = Category; // Export the Cart model

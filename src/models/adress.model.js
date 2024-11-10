const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const AddressSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // Corrected "require" to "required"
    lastName: { type: String, required: true }, // Corrected "require" to "required"
    streetAddress: { type: String, required: true }, // Corrected "require" to "required" and used camelCase for consistency
    city: { type: String, required: true }, // Corrected "require" to "required" and used camelCase for consistency
    state: { type: String, required: true }, // Corrected "equire" to "required"
    zipCode: { type: Number, required: true }, // Corrected "equire" to "required"
    user: {
        type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId declaration
        ref: "User",
        required: true // Add "required: true" to enforce that this field is mandatory
    },
    mobile: { type: String, required: true } // Corrected "equire" to "required"
});

const Address = mongoose.model("Address", AddressSchema); // Corrected the typo in "moongoose" to "mongoose"
module.exports = Address;

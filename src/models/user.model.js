const mongoose = require("mongoose");
const Address = require("./adress.model.js");
const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true, default: "CUSTOMER" },
    mobile: { type: String },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }],
    paymentInformation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment_Information"
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rating"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

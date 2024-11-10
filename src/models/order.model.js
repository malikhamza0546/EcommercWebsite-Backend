const { truncate } = require("fs");
const mongoose = require("mongoose"); // Corrected the typo in "moongose"

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orderItems"
        }
    ],
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    shippingAddress: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Address"
        type: String,
        required: true
    },
    paymentDetails: {
        paymentMethod: {
            type: String
        },
        transactionId: {
            type: String
        },
        paymentId: {
            type: String
        },
        paymentStatus: {
            type: String,
            default: "Prending"
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscountPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    totalItem: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Order = mongoose.model("Order", orderSchema); // Corrected the model name to "Cart"
module.exports = Order; // Export the Cart model

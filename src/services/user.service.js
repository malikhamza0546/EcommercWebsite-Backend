const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");
const Product = require("../models/Product.model");
const orderItems = require("../models/orderItems.model");

const createUser = async (useData) => {
    try {
        let { firstName, lastName, email, password } = useData;
        const isUserExist = await User.findOne({ email: email })
        if (isUserExist) {
            throw new Error("user already exist with email:", email)
        }
        password = await bcrypt.hash(password, 8);
        const user = await User.create({ firstName, lastName, email, password });
        return user;


    } catch (error) {
        console.log("Error", error.message);
        throw new Error(error.message)
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with email", email);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserById = async (ID) => {
    try {
        const user = await User.findById(ID).populate("address");
        if (!user) {
            throw new Error("User not found with ID", ID);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserProfileByToken = async (Token) => {
    try {
        let userId = jwtProvider.getUserIdfromToken(Token);

        let user = await findUserById(userId);
        if (!user) {
            throw new Error("User not found with ID", ID);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUsers = async () => {
    try {
        let AllUsers = await User.find();
        return AllUsers;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const CreateOrderItemService = async (req, res) => {
    try {
        // Ensure `req.user` is properly set by authentication middleware
        console.log("User ID:", req.user.userId);

        // Step 1: Find the product by ID (hardcoded product ID for this example)
        const product = await Product.findById("670ebdf4567533207cd44863");
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Step 2: Find the user by ID (make sure `findUserById` is correctly implemented)
        const Userr = await findUserById(req.user.userId);
        if (!Userr) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(Userr, "User found");

        // Step 3: Create a new order item using the product details and user ID
        const newOrderItem = await orderItems.create({
            product: product._id,
            size: "Large",
            quantity: 4,
            Price: product.price, // Fixed variable name (was "Price")
            discountPrice: product.discountPrice || 0, // Ensure discountPrice is provided
            userId: Userr._id // Ensure userId is correctly passed
        });
        console.log(newOrderItem, "newOrderItemnewOrderItemnewOrderItem");
        // Save the new order item to the database

        console.log("Order item saved successfully.");


        // Step 4: Return the created order item as a response
        return newOrderItem;

    } catch (error) {
        // Step 5: Handle errors properly, ensuring response is only sent once
        console.error(error);

        // Only send a response once in case of an error
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};







module.exports = { createUser, findUserByEmail, findUserById, getUserProfileByToken, getAllUsers, CreateOrderItemService }
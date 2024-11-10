const userService = require("../services/user.service.js")
// Bearer token 
const getUserProfile = async (req, res) => {
    try {
        // Correctly get the token from the Authorization header
        const jwt = req.headers.authorization?.split(" ")[1];
        if (!jwt) {
            // Properly handle the case where the token is not found
            return res.status(401).send({ error: "Token not found" }); // 401 Unauthorized
        }

        // Assuming `getUserProfileByToken` returns a user or throws an error if the token is invalid
        console.log(jwt, "jwtjwtjwt")
        const user = await userService.getUserProfileByToken(jwt);
        if (!user) {
            // If no user is found, handle it appropriately
            return res.status(404).send({ error: "User not found" }); // 404 Not Found
        }

        // Send the user profile as a response
        res.status(200).send({ user }); // Sending the user data
    } catch (error) {
        // Handle unexpected errors
        res.status(500).send({ error: error.message }); // 500 Internal Server Error
    }
}


const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users)
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const CreateOrderItem = async (req, res) => {
    try {
        const newOrderItem = await userService.CreateOrderItemService(req, res);
        return res.status(200).send({ msg: "Order Item Created Succesfully", newOrderItem: newOrderItem })
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getUserProfile, getAllUser, CreateOrderItem
}
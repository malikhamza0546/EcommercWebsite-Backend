const userService = require("../services/user.service.js");
const JWTProvider = require("../config/jwtProvider.js")
const bcrypt = require('bcrypt');
const cartService = require("../services/cart.service.js");
const register = async (req, res) => {

    try {
        const user = await userService.createUser(req.body);
        const jwt = JWTProvider.generateToken(user._id);
        await cartService.createCart(user);

        return res.status(200).send({ jwt, message: "Register Success" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(400).send({ Error: "User Not Found" })
        }
        let IsPasswordValid = await bcrypt.compare(password, user.password);
        console.log(IsPasswordValid, "IsPasswordValid", user.password, password)

        if (!IsPasswordValid) {
            return res.status(401).send({ message: "Invalid Password.." })
        }

        const jwt = JWTProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: "Login Success" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
module.exports = {
    register, login
}

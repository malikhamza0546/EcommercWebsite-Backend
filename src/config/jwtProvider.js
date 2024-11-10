const jwt = require("jsonwebtoken");
const SECRET_KEY = "dfdsfsdfdfsfsdfsdfsdfvsfdsd";
const generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, SECRET_KEY, { expiresIn: "8h", })
    return token;
}

const getUserIdfromToken = (token) => {

    const decodedToekn = jwt.verify(token, SECRET_KEY);
    return decodedToekn.userId
}

module.exports = {
    generateToken, getUserIdfromToken, SECRET_KEY
}
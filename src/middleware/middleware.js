const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/jwtProvider');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Attach decoded token data to req.user
        req.user = decoded;


        // Proceed to the next middleware or controller
        next();
    });
};

module.exports = verifyToken;

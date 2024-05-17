const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (err) {
        throw new Error('Token tidak valid atau kedaluwarsa');
    }
};

module.exports = { generateToken, verifyToken };

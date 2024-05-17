const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');

const register = async (username, email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email sudah digunakan.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });
    return newUser;
};

const authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Pengguna tidak ditemukan.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password tidak sesuai.');
    }

    return user;
};

module.exports = { register, authenticate };

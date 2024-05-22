const bcrypt = require('bcrypt');
const database = require("../models/")
const User = database.user;
const { generateToken, verifyToken } = require('../utils/jwtUtils');

const login = async (req, res) => {
    const { email, password } = req.body;

    const userData = await User.findOne({ where: { email: email } });

    if (userData === 0 || userData === null) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address',
            data: []
        })
    }

    const isMatch = await bcrypt.compareSync(password, userData.password);

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: 'Invalid password',
            data: []
        });
    }

    const token = generateToken({ id: userData.id, email: userData.email });


    return res.status(200).json({
        success: true,
        message: "Berhasil Login",
        data: {
            user: userData,
            token: token
        }
    });
};

const register = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({
            success: false,
            message: 'Passwords do not match. Please try again.',
            data: []
        });
    }

    const existingUser = await User.findOne({
        where: { email: email }
    });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'The email is already in use by another user.',
            data: []
        });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = await User.create({ name: name, email: email, password: hashedPassword });

    const userData = await User.findOne({ where: { id: newUser.id } })

    return res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: {
            user: userData,
            token: ''
        }
    });
};

module.exports = { login, register };
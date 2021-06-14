const User = require('../models/userModel');
const { BadRequest } = require('../utils/errors');
const generateToken = require('../utils/generateToken');

// @desc    Login User
// @route   POST api/users/login
// @access  Public
const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new BadRequest('Invalid email or password');

        if (user && (await user.matchPassword(password))) {
            return res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else throw new BadRequest('Invalid email or password');
    } catch (error) {
        next(error);
    }
};

// @desc    Register new User
// @route   POST api/users
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name) throw new BadRequest('Name is required!');
        if (!email) throw new BadRequest('Email is required!');
        if (!password) throw new BadRequest('Password is required!');

        const userExists = await User.findOne({ email });
        if (userExists) throw new BadRequest('User already exists!');

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            throw new BadRequest('Invalid user data!');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, authUser };

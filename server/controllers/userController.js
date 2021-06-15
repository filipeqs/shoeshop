const User = require('../models/userModel');
const { BadRequest, NotFound } = require('../utils/errors');
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
            return res.json({
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

// @desc    Get Logged in User Profile
// @route   POST api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
    try {
        return res.json(req.user);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all Users
// @route   Get api/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Update Logged in User
// @route   PUT api/users/profile
// @access  Private
const updateMyProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) throw new NotFound('User not found!');

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        const updatedUser = await user.save();

        return res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update User by ID
// @route   PUT api/users/:id
// @access  Private/Admin
const updateUserById = async (req, res, next) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) throw new NotFound('User not found!');

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if (req.user.isAdmin && isAdmin !== undefined) user.isAdmin = isAdmin;

        const updatedUser = await user.save();

        return res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new NotFound('User not found!');

    await user.remove();
};

// @desc    Delete Logged in User
// @route   DELETE api/users/profile
// @access  Private
const deleteMyProfile = async (req, res, next) => {
    try {
        await deleteUser(req.user._id);
        return res.json({ message: 'User removed!' });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete User by Id
// @route   DELETE api/users/:id
// @access  Private/Admin
const deleteUserById = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);
        return res.json({ message: 'User removed!' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    deleteMyProfile,
    deleteUserById,
    getAllUsers,
    updateMyProfile,
    updateUserById,
};

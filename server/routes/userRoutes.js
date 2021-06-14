const express = require('express');
const {
    registerUser,
    authUser,
    getUserProfile,
    deleteMyProfile,
    deleteUserById,
    getAllUsers,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, admin, getAllUsers).post(registerUser);

router.route('/:id').delete(protect, admin, deleteUserById);

router.route('/profile').get(protect, getUserProfile).delete(protect, deleteMyProfile);

router.route('/login').post(authUser);

module.exports = router;

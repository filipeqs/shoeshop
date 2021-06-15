const express = require('express');
const {
    registerUser,
    authUser,
    getUserProfile,
    deleteMyProfile,
    deleteUserById,
    getAllUsers,
    updateMyProfile,
    updateUserById,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, admin, getAllUsers).post(registerUser);

router.route('/:id').put(protect, admin, updateUserById).delete(protect, admin, deleteUserById);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateMyProfile)
    .delete(protect, deleteMyProfile);

router.route('/login').post(authUser);

module.exports = router;

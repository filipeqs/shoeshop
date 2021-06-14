const express = require('express');
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(registerUser);

router.route('/profile').get(protect, getUserProfile);

router.route('/login').post(authUser);

module.exports = router;

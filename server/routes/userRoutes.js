const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/login').post(authUser);

router.route('/').post(registerUser);

module.exports = router;

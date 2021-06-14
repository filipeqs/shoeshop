const jwt = require('jsonwebtoken');
const { NotFound, BadRequest } = require('../utils/errors');

const User = require('../models/userModel.js');

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];

                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                req.user = await User.findById(decoded.id).select('-password');

                next();
            } catch (error) {
                throw new BadRequest('Not authorized, token failed');
            }
        }

        if (!token) {
            throw new NotFound('Not authorized, no token');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { protect };

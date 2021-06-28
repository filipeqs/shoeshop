const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const route = express.Router();

route.route('/').get(getProducts).post(protect, admin, createProduct);

route.route('/:id').get(getProductById).put(protect, admin, updateProduct);

module.exports = route;

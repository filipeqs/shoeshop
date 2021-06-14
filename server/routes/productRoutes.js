const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const route = express.Router();

route.route('/').get(getProducts).post(protect, createProduct);

route.route('/:id').get(getProductById);

module.exports = route;

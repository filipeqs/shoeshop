const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

const route = express.Router();

route.route('/').get(getProducts).post(createProduct);

route.route('/:id').get(getProductById);

module.exports = route;

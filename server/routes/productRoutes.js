const express = require('express');

const { getProducts, getProductById } = require('../controllers/productController');

const route = express.Router();

route.route('/').get(getProducts);

route.route('/:id').get(getProductById);

module.exports = route;

const express = require('express');

const { getProducts } = require('../controllers/productController');

const route = express.Router();

route.route('/').get(getProducts);

module.exports = route;

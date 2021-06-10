const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
    return res.send('products route');
});

module.exports = route;

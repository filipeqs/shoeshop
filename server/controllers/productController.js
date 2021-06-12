const Product = require('../models/productModel');

const sorts = {
    rating: { rating: -1 },
    name: { name: 1 },
    highestPrice: { price: -1 },
    lowestPrice: { price: 1 },
};

// @desc    Fetch all Products
// @route   GET /api/products?pageNumber=1&sortBy=rating&brand=adidas&keyword=brand
// @access  Public
const getProducts = async (req, res) => {
    try {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;
        const sortParam = sorts[req.query.sortBy] || sorts['rating'];

        const keyword = req.query.keyword
            ? {
                  brand: {
                      $regex: req.query.keyword,
                      $options: 'i',
                  },
              }
            : {};

        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort(sortParam);

        return res.send({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ message: error.message });
    }
};

// @desc    Fetch product by id
// @route   GET /api/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found!' });
        }

        return res.send(product);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ message: error.message });
    }
};

module.exports = { getProducts, getProductById };

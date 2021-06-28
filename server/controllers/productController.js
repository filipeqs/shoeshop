const { NotFound, BadRequest } = require('../utils/errors');
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
const getProducts = async (req, res, next) => {
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
            .skip(pageSize * (page - 1));

        return res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch Product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) throw new NotFound('Product not found!');

        return res.json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new Product
// @route   POST api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const { name, brand, description, image, price, stock } = req.body;

        const product = await Product.create({
            name,
            brand,
            description,
            image,
            price,
            stock,
            user: req.user._id,
        });

        return res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Update Product
// @route   PUT api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const { name, brand, description, image, price, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) throw new BadRequest('Product not found!');

        product.name = name;
        product.brand = brand;
        product.description = description;
        product.image = image;
        product.price = price;
        product.stock = stock;

        const updatedProduct = await product.save();
        return res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new Review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) throw new BadRequest('Product not found!');

        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString(),
        );

        if (alreadyReviewed) throw new BadRequest('Product already reviewed');

        const newReview = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(newReview);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, review) => review.rating + acc, 0) /
            product.reviews.length;
        await product.save();

        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, createProductReview };

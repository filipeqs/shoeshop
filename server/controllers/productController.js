const { NotFound, BadRequest } = require('../utils/errors');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel');

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

        let reviews = await Review.find({ product: req.params.id });

        const alreadyReviewed = reviews.find(
            (review) => review.user.toString() === req.user._id.toString(),
        );

        if (alreadyReviewed) throw new BadRequest('Product already reviewed');

        const newReview = new Review({
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
            product: req.params.id,
        });

        await newReview.save();

        reviews = await Review.find({ product: req.params.id });
        product.numReviews = reviews.length;
        product.rating = reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length;
        await product.save();

        return res.status(201).json({ message: 'Review added' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get Reviews By Product ID
// @route   GET /api/products/:id/reviews
// @access  Private
const getReviewsByProductId = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) throw new BadRequest('Product not found!');

        const reviews = await Review.find({ product: req.params.id });

        return res.json(reviews);
    } catch (error) {
        next(error);
    }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ rating: -1 }).limit(3);

        res.json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Get top rated products
// @route   GET /api/products/random
// @access  Public
const getRandomProducts = async (req, res, next) => {
    try {
        const limit = 8;
        const count = await Product.countDocuments();
        let random = Math.floor(Math.random() * count);
        random = random > count - limit ? 0 : random;

        const products = await Product.find().skip(random).limit(limit);

        res.json(products);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    createProductReview,
    getReviewsByProductId,
    getTopProducts,
    getRandomProducts,
};

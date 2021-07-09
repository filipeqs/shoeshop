const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    createProductReview,
    getReviewsByProductId,
    getAllReviewsByProductId,
    getTopProducts,
    getRandomProducts,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.get('/top', getTopProducts);

router.get('/random', getRandomProducts);

router.route('/:id').get(getProductById).put(protect, admin, updateProduct);

router.route('/:id/reviews').get(getReviewsByProductId).post(protect, createProductReview);

router.route('/:id/reviews/all').get(getAllReviewsByProductId);

module.exports = router;

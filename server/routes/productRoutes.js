const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    createProductReview,
    getReviewsByProductId,
    getTopProducts,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.get('/top', getTopProducts);

router.route('/:id').get(getProductById).put(protect, admin, updateProduct);

router.route('/:id/reviews').get(getReviewsByProductId).post(protect, createProductReview);

module.exports = router;

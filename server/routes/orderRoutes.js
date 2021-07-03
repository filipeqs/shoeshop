const express = require('express');

const {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();
router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

module.exports = router;

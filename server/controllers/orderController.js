const { NotFound, BadRequest } = require('../utils/errors');
const Order = require('../models/orderModel');

// @desc    Create new Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) throw new BadRequest('No order items!');

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        return res.status(201).send(createdOrder);
    } catch (error) {
        next(error);
    }
};

// @desc    Get Logged in User Orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        return res.send(orders);
    } catch (error) {
        next(error);
    }
};

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) throw new NotFound('Order not found!');

        return res.send(order);
    } catch (error) {
        next(error);
    }
};

// @desc    Get All Orders
// @route   GET /api/orders/
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');

        return res.send(orders);
    } catch (error) {
        next(error);
    }
};

module.exports = { addOrderItems, getMyOrders, getOrderById, getOrders };

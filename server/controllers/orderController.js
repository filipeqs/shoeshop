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
            subtotal,
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
            subtotal,
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

        if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin)
            throw new NotFound('Order not found!');

        return res.send(order);
    } catch (error) {
        next(error);
    }
};

// @desc    Get All Orders
// @route   GET /api/orders/
// @access  Private/Admin
const getOrders = async (req, res, next) => {
    try {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;

        let keyword = req.query.orderId
            ? {
                  _id: req.query.orderId,
              }
            : {};

        keyword = req.query.userId
            ? {
                  ...keyword,
                  user: req.query.userId,
              }
            : { ...keyword };

        const count = await Order.countDocuments({ ...keyword });
        const orders = await Order.find({ ...keyword })
            .populate('user', 'id name')
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        return res.send({ orders, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        next(error);
    }
};

// @desc    Update order to Paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) throw new BadRequest('Order not found');

        if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin)
            throw new NotFound('Order not found!');

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        return res.send(updatedOrder);
    } catch (error) {
        next(error);
    }
};

// @desc    Update order to Delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) throw new NotFound('Order not found');

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        return res.send(updatedOrder);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
};

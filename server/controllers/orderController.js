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

module.exports = { addOrderItems };

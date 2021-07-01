const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User is required!'],
            ref: 'User',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Product is required!'],
            ref: 'Product',
        },
        name: {
            type: String,
            required: [true, 'Name is required!'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required!'],
        },
        comment: {
            type: String,
            required: [true, 'Comment is required!'],
        },
    },
    {
        timestamps: true,
    },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

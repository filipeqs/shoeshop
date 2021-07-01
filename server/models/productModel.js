const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User is required!'],
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Name is required!'],
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
        },
        brand: {
            type: String,
            required: [true, 'Brand is required!'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Price is required!'],
            default: 0,
        },
        stock: [
            {
                count: {
                    type: Number,
                    require: [true, 'Count in stock is required!'],
                    default: 0,
                },
                size: {
                    type: Number,
                    required: [true, 'Size is required!'],
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

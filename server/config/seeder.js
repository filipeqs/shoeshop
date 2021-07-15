const connectDB = require('./db');
const dotenv = require('dotenv');
const colors = require('colors');

const users = require('../data/user');
const products = require('../data/products');

const Address = require('../models/addressModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Address.deleteMany();
        await Product.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users);

        const adminUser = createdUser[0]._id;

        const sampleProducts = products.map((product) => ({ ...product, user: adminUser }));

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Address.deleteMany();
        await Product.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

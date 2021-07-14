const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

// Initialize DB
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
    );
} else {
    app.get('/', (req, res) => res.send('API is running'));
}

// Middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
);

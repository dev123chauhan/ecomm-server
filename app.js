const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorMiddleware = require('./api/middleware/errorMiddleware');
const productRoutes = require('./api/routes/productRoutes');
const exploreProductRoutes = require('./api/routes/exploreProductRoutes');
const userRoutes = require('./api/routes/userRoutes');
const contactRoutes = require('./api/routes/contactRoutes');
const cartRoutes = require('./api/routes/cartRoute');
const wishlistRoutes = require('./api/routes/wishlistRoute');
const privacyPolicyRoutes = require('./api/routes/privacyPolicyRoutes');
const productBannerRoutes = require('./api/routes/productBannerRoutes');
const categoryRoutes = require('./api/routes/categoryRoutes');
const shopRoutes = require('./api/routes/shopRoutes');
const paymentRoutes = require('./api/routes/paymentRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectDB()
app.use('/api/categories', categoryRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/exploreproducts', exploreProductRoutes);
app.use('/api/productbanner', productBannerRoutes)
app.use('/api', wishlistRoutes);
app.use('/api', cartRoutes);
app.use('/api/privacy-policy', privacyPolicyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorMiddleware);
app.get('*', (req, res) => {
  res.status(200).json({ message: 'bad request' });
});

module.exports = app;
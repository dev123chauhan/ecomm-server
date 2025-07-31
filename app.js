const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const exploreProductRoutes = require('./routes/exploreProductRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cartRoutes = require('./routes/cartRoute');
const wishlistRoutes = require('./routes/wishlistRoute');
const privacyPolicyRoutes = require('./routes/privacyPolicyRoutes');
const productBannerRoutes = require('./routes/productBannerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const shopRoutes = require('./routes/shopRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
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

app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})

module.exports = app;
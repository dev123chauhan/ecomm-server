const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    ref: 'Category'
  },
  subCategory: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    default: "₹",
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
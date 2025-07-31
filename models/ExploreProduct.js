const mongoose = require('mongoose');

const ExploreProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  currency: {
    type: String,
    default: "₹",
  },
  isNew: {
    type: Boolean,
    default: false
    
  },
  colors: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('ExploreProduct', ExploreProductSchema);
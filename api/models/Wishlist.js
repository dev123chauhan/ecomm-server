const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  productType: {
    type: String,
    required: true,
    enum: ['Product', 'Shop', 'ExploreProduct']
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});


wishlistSchema.index({ userId: 1, productId: 1, productType: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);



















const Wishlist = require('../models/Wishlist');
exports.toggleWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const existingItem = await Wishlist.findOne({ 
      userId, 
      productId 
    });

    if (existingItem) {
      await Wishlist.findOneAndDelete({ 
        userId, 
        productId 
      });
    } else {
      await Wishlist.create({ userId, productId });
    }

    const updatedWishlist = await Wishlist.find({ userId })
      .populate('productId')
      .exec();

    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.find({ userId })
      .populate('productId')
      .exec();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    await Wishlist.findOneAndDelete({ 
      userId, 
      productId 
    });
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
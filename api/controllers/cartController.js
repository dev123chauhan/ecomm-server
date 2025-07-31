const Cart = require("../models/Cart");
const cartController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      let cart = await Cart.findOne({ userId: req.params.userId });

      if (!cart) {
        cart = new Cart({
          userId: req.params.userId,
          items: [],
          totalAmount: 0,
        });
      }
      const { id, name, price, image } = req.body;
      const existingItem = cart.items.find(
        (item) => item.productId && item.productId.toString() === id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        cart.items.push({
          productId: id,
          name,
          price,
          image,
          quantity: 1,
          totalPrice: price,
        });
      }

      cart.totalAmount = cart.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the index of the item to remove
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId && item.productId.toString() === req.params.productId
      );

      cart.items.splice(itemIndex, 1);

      cart.totalAmount = cart.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = cartController;

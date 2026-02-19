const Cart = require("../models/Cart");

const cartController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) {
        return res.json({
          userId: req.params.userId,
          items: [],
          totalAmount: 0
        });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { id, name, price, image, quantity = 1 } = req.body; 
      
      if (!id || !name || !price || !image) {
        return res.status(400).json({ message: "Product details are required" });
      }

      let cart = await Cart.findOne({ userId: req.params.userId });
      
      if (!cart) {
        cart = new Cart({
          userId: req.params.userId,
          items: [{
            productId: id,
            name,
            price,
            image,
            quantity: quantity, 
            totalPrice: price * quantity,
          }],
          totalAmount: price * quantity,
        });
        await cart.save();
        return res.json(cart);
      }

      const existingItem = cart.items.find(
        (item) => item.productId && item.productId.toString() === id
      );

      if (existingItem) {
        existingItem.quantity += quantity; 
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        cart.items.push({
          productId: id,
          name,
          price,
          image,
          quantity: quantity, 
          totalPrice: price * quantity,
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
      
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId && item.productId.toString() === req.params.productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      cart.items.splice(itemIndex, 1);

      if (cart.items.length === 0) {
        await Cart.deleteOne({ userId: req.params.userId });
        return res.json({ 
          message: "Cart is now empty",
          userId: req.params.userId,
          items: [],
          totalAmount: 0
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

  updateQuantity: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const { action } = req.body;

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const item = cart.items.find(
        (item) => item.productId && item.productId.toString() === productId
      );

      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      if (action === "increase") {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
      } else if (action === "decrease") {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice = item.quantity * item.price;
        } else {
          const itemIndex = cart.items.findIndex(
            (i) => i.productId && i.productId.toString() === productId
          );
          cart.items.splice(itemIndex, 1);
          if (cart.items.length === 0) {
            await Cart.deleteOne({ userId });
            return res.json({ 
              message: "Cart is now empty",
              userId: userId,
              items: [],
              totalAmount: 0
            });
          }
        }
      } else {
        return res.status(400).json({ message: "Invalid action" });
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
};

module.exports = cartController;
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
        default: '₹',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    firstName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    apartment: { type: String },
    townCity: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['razorpay', 'cash_on_delivery', 'bank', 'UPI'],
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'created', 'completed', 'failed', 'cancelled'],
    default: 'pending',
  },
  razorpayOrderId: {
    type: String,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing',
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
const razorpayInstance = require('../../config/razorpay');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const crypto = require('crypto');

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = '₹', receipt, notes } = req.body;
    
    const options = {
      amount: amount * 100, 
      currency,
      receipt,
      notes,
    };
    
    const order = await razorpayInstance.orders.create(options);
    

    await Order.findByIdAndUpdate(receipt, {
      razorpayOrderId: order.id,
      paymentStatus: 'created',
    });
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpayOrderId, 
      razorpayPaymentId, 
      razorpaySignature,
      orderId
    } = req.body;
    

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
      
    const isAuthentic = expectedSignature === razorpaySignature;
    
    if (isAuthentic) {
      await Payment.create({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        orderId,
      });
      

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'completed',
        isPaid: true,
        paidAt: Date.now(),
      });
      
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'failed',
      });
      
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message,
    });
  }
};


exports.getKey = (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
};
const ExploreProduct = require("../models/ExploreProduct");
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const products = await ExploreProduct.find().skip(skip).limit(limit).sort();

    const total = await ExploreProduct.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages,
      currentPage: page,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error: " + error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await ExploreProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error: " + error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, image } = req.body;
    const existingProduct = await ExploreProduct.findOne({
      $or: [{ name }, { image }],
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with the same name or image already exists",
      });
    }

    const product = await ExploreProduct.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: messages });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate field value entered",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server Error: " + error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await ExploreProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error: " + error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await ExploreProduct.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error: " + error.message,
    });
  }
};

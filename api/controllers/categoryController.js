const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoriesObj = {};
    categories.forEach(category => {
      categoriesObj[category.name] = category.subCategories;
    });
    
    res.status(200).json(categoriesObj);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, subCategories } = req.body;
    const newCategory = new Category({ name, subCategories });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const ExploreProduct = require('../models/ExploreProduct');


const getProductModel = (productType) => {
  switch (productType) {
    case 'Product':
      return Product;
    case 'Shop':
      return Shop;
    case 'ExploreProduct':
      return ExploreProduct;
    default:
      throw new Error('Invalid product type');
  }
};

exports.toggleWishlistItem = async (req, res) => {
  try {
    const { userId, productId, productType } = req.body;

    if (!userId || !productId || !productType) {
      return res.status(400).json({ 
        message: 'userId, productId, and productType are required' 
      });
    }


    const ProductModel = getProductModel(productType);
    const productExists = await ProductModel.findById(productId);
    
    if (!productExists) {
      return res.status(404).json({ 
        message: 'Product not found in specified collection' 
      });
    }

    const existingItem = await Wishlist.findOne({ 
      userId, 
      productId,
      productType
    });

    if (existingItem) { 
      await Wishlist.findOneAndDelete({ 
        userId, 
        productId,
        productType
      });
    } else {
      await Wishlist.create({ userId, productId, productType });
    }


    const updatedWishlist = await getWishlistWithProducts(userId);
    res.json(updatedWishlist);
  } catch (error) {
    console.error('Toggle wishlist error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await getWishlistWithProducts(userId);
    res.json(wishlist);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, productId, productType } = req.params;
    
    await Wishlist.findOneAndDelete({ 
      userId, 
      productId,
      productType
    });
    
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    console.error('Remove item error:', error);
    res.status(500).json({ message: error.message });
  }
};


async function getWishlistWithProducts(userId) {
  const wishlistItems = await Wishlist.find({ userId });
  
  const populatedItems = await Promise.all(
    wishlistItems.map(async (item) => {
      try {
        const ProductModel = getProductModel(item.productType);
        const product = await ProductModel.findById(item.productId);
        
        if (!product) {

          await Wishlist.findByIdAndDelete(item._id);
          return null;
        }
        
        return {
          _id: item._id,
          userId: item.userId,
          productId: product,
          productType: item.productType,
          createdAt: item.createdAt
        };
      } catch (error) {
        console.error('Error populating product:', error);
        return null;
      }
    })
  );
  

  return populatedItems.filter(item => item !== null);
}





















































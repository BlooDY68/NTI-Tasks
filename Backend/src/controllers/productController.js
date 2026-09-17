const Product = require('../models/Product');
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, brand, stock } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return ApiResponse.error(res, 'Specified category does not exist', 404);
    }

    let image = '/uploads/products/default-product.png';
    if (req.file) {
      image = `/uploads/products/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      brand,
      stock: Number(stock),
      image
    });

    const populatedProduct = await product.populate('category', 'name description');

    return ApiResponse.success(res, 'Product created successfully', { product: populatedProduct }, 201);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { search, category, brand } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter)
      .populate('category', 'name description')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'Products retrieved successfully', {
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name description');
    if (!product) {
      return ApiResponse.error(res, 'Product not found', 404);
    }
    return ApiResponse.success(res, 'Product retrieved successfully', { product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return ApiResponse.error(res, 'Product not found', 404);
    }

    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return ApiResponse.error(res, 'Specified category does not exist', 404);
      }
      product.category = req.body.category;
    }

    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price !== undefined) product.price = Number(req.body.price);
    if (req.body.brand) product.brand = req.body.brand;
    if (req.body.stock !== undefined) product.stock = Number(req.body.stock);

    if (req.file) {
      product.image = `/uploads/products/${req.file.filename}`;
    }

    await product.save();
    const updatedProduct = await product.populate('category', 'name description');

    return ApiResponse.success(res, 'Product updated successfully', { product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return ApiResponse.error(res, 'Product not found', 404);
    }

    await Product.findByIdAndDelete(req.params.id);
    return ApiResponse.success(res, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};

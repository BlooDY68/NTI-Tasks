const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === '') {
      return ApiResponse.error(res, 'Category name is required', 400);
    }

    const categoryExists = await Category.findOne({ name: name.trim() });
    if (categoryExists) {
      return ApiResponse.error(res, 'Category with this name already exists', 409);
    }

    const category = await Category.create({
      name: name.trim(),
      description
    });

    return ApiResponse.success(res, 'Category created successfully', { category }, 201);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    return ApiResponse.success(res, 'Categories retrieved successfully', {
      count: categories.length,
      categories
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return ApiResponse.error(res, 'Category not found', 404);
    }
    return ApiResponse.success(res, 'Category retrieved successfully', { category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return ApiResponse.error(res, 'Category not found', 404);
    }

    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description;

    await category.save();

    return ApiResponse.success(res, 'Category updated successfully', { category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return ApiResponse.error(res, 'Category not found', 404);
    }

    await Category.findByIdAndDelete(req.params.id);
    return ApiResponse.success(res, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};

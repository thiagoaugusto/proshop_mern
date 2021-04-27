import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express();

// @desc    Fetch all products
// route    GET /api/products
// access   Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.status(200).json({ products });
  })
);

// @desc    Fetch single product
// route    GET /api/products/:id
// access   Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  })
);

export default router;

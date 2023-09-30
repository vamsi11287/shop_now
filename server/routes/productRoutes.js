import express from 'express'
import Product from '../models/productModel.js '
import asyncHandler from 'express-async-handler'
import { getProductById, getProducts } from '../controllers/productController.js'

const router = express.Router()

// fetch all products
router.get('/', getProducts)

// fetch single product
router.get('/:id', getProductById)

export default router
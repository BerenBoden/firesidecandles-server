import express from 'express';
import { getProducts, sortProducts } from '../controllers/products.js';

const router = express.Router();

router.route('/').get(getProducts)
router.route('/:sort').get(sortProducts)

export default router;
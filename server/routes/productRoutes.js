import express from 'express';
import {
    createProduct,
    getAllProducts
} from '../controllers/productController.js';

import { protect, artisanOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', protect, artisanOnly, createProduct);

export default router;

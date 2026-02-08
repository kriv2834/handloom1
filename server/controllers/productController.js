import Product from '../models/Product.js';

/* Artisan adds product */
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            artisan: req.user.id
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/* Public: get all products */
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('artisan', 'name');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

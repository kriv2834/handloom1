import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    material: {
        type: String,
    },
    image: {
        type: String, // URL to the image (can be local or cloud)
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    artisan: {
        type: String, // Name of the artisan/seller
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;

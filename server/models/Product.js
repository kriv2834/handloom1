import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String
    }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    material: {
        type: String
    },

    image: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    },

    artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // artisan user
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'out_of_stock'],
        default: 'active'
    },

    ratings: {
        type: Number,
        default: 0
    },

    reviews: [reviewSchema],

    totalSold: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;

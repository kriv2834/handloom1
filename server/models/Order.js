import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ],
    totalPrice: Number,
    status: {
        type: String,
        default: "Placed"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Order", orderSchema);

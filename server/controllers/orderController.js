import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart empty" });
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.quantity * 100, // dummy price
        0
    );

    const order = await Order.create({
        user: req.user._id,
        orderItems: cart.items,
        totalPrice: total
    });

    await Cart.deleteOne({ user: req.user._id });

    res.json(order);
};

export const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

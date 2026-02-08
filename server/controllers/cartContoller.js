import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({
            user: req.user._id,
            items: [{ product: productId, quantity }]
        });
    } else {
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
    }

    await cart.save();
    res.json(cart);
};

export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json(cart);
};

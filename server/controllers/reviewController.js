import Review from "../models/Review.js";

export const addReview = async (req, res) => {
    const { productId, rating, comment } = req.body;

    const review = await Review.create({
        user: req.user._id,
        product: productId,
        rating,
        comment
    });

    res.json(review);
};

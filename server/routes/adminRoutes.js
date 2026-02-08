import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

router.get("/orders", protect, adminOnly, async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

export default router;

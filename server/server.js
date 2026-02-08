import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend connected successfully");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
app.use("/api/products", productRoutes);
import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);
import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);
import cartRoutes from "./routes/cartRoutes.js";
app.use("/api/cart", cartRoutes);
import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);
import reviewRoutes from "./routes/reviewRoutes.js";
app.use("/api/reviews", reviewRoutes);
import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/admin", adminRoutes);

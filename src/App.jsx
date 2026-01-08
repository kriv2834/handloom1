import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SellerDashboard from './pages/seller/Dashboard';
import CheckoutPage from './pages/CheckoutPage';
import UserDashboard from './pages/buyer/UserDashboard';
import ProductDetailPage from './pages/ProductDetailPage';
import OurStoryPage from './pages/OurStoryPage';
import { ProductProvider } from './context/ProductContext';

/**
 * Main Application Component
 * Sets up the Routing infrastructure and Global Providers (CartProvider, AuthProvider).
 * Handles navigation between Buyer and Seller portals.
 */
function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-stone-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  {/* Unified Login Route */}
                  <Route path="/login" element={<LoginPage />} />
                  {/* Legacy route redirect or keep for sellers */}
                  <Route path="/sellers" element={<LoginPage />} />

                  <Route path="/seller/dashboard" element={<SellerDashboard />} />
                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/our-story" element={<OurStoryPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;

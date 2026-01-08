# LoomLegacy - Handloom Artisan E-Commerce Platform

![LoomLegacy](https://img.shields.io/badge/Status-Completed-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![React](https://img.shields.io/badge/Built%20With-React-61DAFB)

## 📜 Project Overview
**LoomLegacy** is a specialized e-commerce platform designed to bridge the gap between traditional Indian handloom artisans and modern consumers. The platform empowers rural weavers by providing a direct-to-consumer digital marketplace that emphasizes **authenticity**, **storytelling**, and **fair trade**.

**Motto:** *"Weaving Traditions, Empowering Artisans"*

## ✨ Key Features
- **Modern User Interface:** A visually stunning design using an earthy color palette (Terracotta, Olive, Cream) and glassmorphism effects.
- **Buyer Ecosystem:**
    - **Smart Cart:** Includes a dynamic **10% Prepaid Discount** logic.
    - **Product Discovery:** Advanced filtering by category, price, and material.
    - **Artisan Stories:** dedicated sections highlighting the weavers behind the products.
- **Seller Ecosystem:**
    - **Dashboard:** A secured portal for artisans to track sales (Orders, Revenue).
    - **Product Management:** Easy-to-use form for uploading new products and stories.
- **Trust & Security:**
    - "Authenticity Guaranteed" badges.
    - Secure checkout indicators.

## 🛠️ Technology Stack
- **Frontend Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Context API

## 🚀 How to Run the Project

1.  **Clone the Repository** (or unzip the folder):
    ```bash
    cd handloom1
    ```

2.  **Install Dependencies:**
    Make sure you have Node.js installed.
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

4.  **Access the Application:**
    Open your browser and navigate to: `http://localhost:5173`

## 📂 Project Structure
```
handloom1/
├── src/
│   ├── components/      # Reusable UI components (Buttons, Navbar, Layouts)
│   ├── context/         # Global State (CartContext)
│   ├── data/            # Mock Data (Products)
│   ├── pages/           # Main Page Views (Home, Shop, Dashboard)
│   ├── App.jsx          # Main Application Entry with Routing
│   └── index.css        # Global Styles & Tailwind Directives
├── public/              # Static Assets
└── README.md            # Project Documentation
```

## 👨‍💻 Developer Notes
- **Design Decisions:** We chose *Tailwind CSS* for rapid, consistent styling and *Context API* for managing cart state to avoid the complexity of Redux for this scope.
- **Future Improvements:** Backend integration (Node.js/Express) and Payment Gateway integration.

---
*Created for College Project Submission | 2026*

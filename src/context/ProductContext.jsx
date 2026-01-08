import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const mappedData = data.map(item => ({
                ...item,
                id: item._id,
                price: Number(item.price) // Ensure price is a number
            }));

            if (mappedData.length > 0) {
                setProducts(mappedData);
            } else {
                console.warn("API returned empty array, using mock data.");
                setProducts(MOCK_PRODUCTS);
            }
            setError(null);
        } catch (err) {
            console.warn("API fetch failed, using mock data:", err);
            setProducts(MOCK_PRODUCTS);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    // Rich Mock Data based on User Request
    const MOCK_PRODUCTS = [
        // Sarees
        { id: 101, name: "Kutch Handwoven Cotton Saree", category: "Saree", price: 4500, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop", artisan: "Ravi Bhai", material: "Organic Cotton", region: "Gujarat" },
        { id: 102, name: "Banarasi Silk Handloom Saree", category: "Saree", price: 12000, image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop", artisan: "Weavers of Varanasi", material: "Pure Silk", region: "Varanasi" },
        { id: 103, name: "Sambalpuri Ikat Cotton Saree", category: "Saree", price: 5600, image: "https://images.unsplash.com/photo-1583391733958-dcf3be546131?q=80&w=1000&auto=format&fit=crop", artisan: "Ananya Devi", material: "Cotton Ikat", region: "Odisha" },
        { id: 104, name: "Bengal Jamdani Muslin Saree", category: "Saree", price: 8500, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop", artisan: "Pronob Das", material: "Muslin", region: "Bengal" },

        // Shawls
        { id: 201, name: "Kashmiri Handwoven Wool Shawl", category: "Shawl", price: 15000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop", artisan: "Bashir Ahmed", material: "Pashmina Wool", region: "Kashmir" },
        { id: 202, name: "Bhujodi Wool Stole", category: "Shawl", price: 3200, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop", artisan: "Vankar Community", material: "Wool", region: "Gujarat" },

        // Apparel
        { id: 301, name: "Handloom Cotton Kurta", category: "Apparel", price: 2100, image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=1000&auto=format&fit=crop", artisan: "FabIndia Co-op", material: "Cotton", region: "Jaipur" },
        { id: 302, name: "Ikat Patterned Kurta", category: "Apparel", price: 2800, image: "https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=1000&auto=format&fit=crop", artisan: "Suresh Rao", material: "Ikat Cotton", region: "Telangana" },
        { id: 303, name: "Khadi Co-ord Set", category: "Apparel", price: 3500, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop", artisan: "EcoWeave", material: "Khadi", region: "Maharashtra" },

        // Home Decor
        { id: 501, name: "Ikat Cushion Cover", category: "Home Decor", price: 850, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?q=80&w=1000&auto=format&fit=crop", artisan: "Pocchampally Weavers", material: "Cotton", region: "Telangana" },
        { id: 502, name: "Handwoven Bed Throw", category: "Home Decor", price: 4200, image: "https://images.unsplash.com/photo-1522771753035-7a58875b2fa1?q=80&w=1000&auto=format&fit=crop", artisan: "Himalayan Looms", material: "Wool Blend", region: "Himachal" },
        { id: 503, name: "Woolen Floor Rug", category: "Home Decor", price: 6500, image: "https://images.unsplash.com/photo-1575407001460-6a1bd793315c?q=80&w=1000&auto=format&fit=crop", artisan: "Mirzapur Weavers", material: "Wool", region: "UP" },

        // Accessories
        { id: 601, name: "Handloom Tote Bag", category: "Accessories", price: 1200, image: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?q=80&w=1000&auto=format&fit=crop", artisan: "Women of Kutch", material: "Cotton Canvas", region: "Gujarat" },
        { id: 602, name: "Ikat Sling Bag", category: "Accessories", price: 1500, image: "https://images.unsplash.com/photo-1554316650-6f03408a0d4c?q=80&w=1000&auto=format&fit=crop", artisan: "Pochampally", material: "Ikat", region: "Telangana" },

        // Limited Drops
        { id: 901, name: "Monsoon Loom Saree", category: "Saree", price: 18000, image: "https://images.unsplash.com/photo-1610189012906-4783382c5e61?q=80&w=1000&auto=format&fit=crop", artisan: "Master Weaver Ali", material: "Fine Silk", region: "Bengal" },
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const addedProduct = await response.json();
            setProducts(prev => [{ ...addedProduct, id: addedProduct._id }, ...prev]);
        } catch (err) {
            console.error("Error adding product:", err);
            // Optionally handle error state specifically for adding
        }
    };

    const deleteProduct = (id) => {
        // TODO: Implement API delete
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    const getProductById = (id) => {
        // Handle both string and number comparisons for ID
        return products.find(p => String(p.id) === String(id) || String(p._id) === String(id));
    };

    const value = {
        products,
        loading,
        error,
        addProduct,
        deleteProduct,
        getProductById
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

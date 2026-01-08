import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for persisted session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('loom_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password, role) => {
        // Mock Authentication Logic
        // In a real app, this would make an API call.
        let userData;
        if (role === 'seller') {
            userData = { name: 'Varanasi Weavers', email, role: 'seller', id: 's1' };
        } else {
            userData = { name: 'Priya Sharma', email, role: 'buyer', id: 'b1' };
        }

        setUser(userData);
        localStorage.setItem('loom_user', JSON.stringify(userData));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('loom_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

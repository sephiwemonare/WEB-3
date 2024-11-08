// src/DashboardD.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './db.css';  // Ensure styles are imported

const DashboardD = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from localStorage on component mount
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    const renderProductsTable = () => {
        return (
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="dashboard">
            <h1>Dashboard - Current Stock Levels</h1>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/product-management">Product Management</Link>
                    </li>
                    <li>
                        <Link to="/user-management">User Management</Link>
                    </li>
                </ul>
            </nav>

            <h2>Current Products</h2>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                renderProductsTable()
            )}
        </div>
    );
};

export default DashboardD;
import React, { useState, useEffect } from 'react';
import './pm.css';  // Ensure styles are imported


const ProductManagement = () => {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [editingProductIndex, setEditingProductIndex] = useState(-1);

    // Clear the form after submitting or canceling edit
    const resetForm = () => {
        setProductName('');
        setProductDescription('');
        setProductCategory('');
        setProductPrice('');
        setProductQuantity('');
        setEditingProductIndex(-1);
    };

    // Handle form submission for adding or updating a product
    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            name: productName,
            description: productDescription,
            category: productCategory,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity)
        };

        let updatedProducts;

        if (editingProductIndex === -1) {
            // Adding a new product
            updatedProducts = [...products, product];
        } else {
            // Updating an existing product
            const newProducts = [...products];
            newProducts[editingProductIndex] = product;
            updatedProducts = newProducts;
        }

        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        resetForm(); // Clear form
    };

    // Handle product deletion
    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    // Initiate editing mode
    const handleEdit = (index) => {
        const product = products[index];
        setProductName(product.name);
        setProductDescription(product.description);
        setProductCategory(product.category);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setEditingProductIndex(index);
    };

    return (
        <div className="product-management">
            <h2>Product Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                <input type="text" placeholder="Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
                <input type="text" placeholder="Category" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required />
                <input type="number" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
                <input type="number" placeholder="Quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
                <button type="submit">{editingProductIndex === -1 ? 'Add Product' : 'Update Product'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;
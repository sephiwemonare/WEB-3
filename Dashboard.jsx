import React from 'react';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import './db.css';  // Ensure styles are imported


const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>Welcome to the Dashboard</h1>
            <button onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login';
            }}>Logout</button>
            <ProductManagement />
            <UserManagement />
        </div>
    );
};

export default Dashboard;

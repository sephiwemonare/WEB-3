import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

import DashboardD from './DashboardD'; // Make sure this file exists
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement'; // Import ProductManagement
import './styles.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleLogin = (user) => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div>
                {/* Navigation links */}
                {!isLoggedIn ? (
                    <div>
                        <nav>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </nav>
                        <Routes>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(false)} />} />
                        </Routes>
                    </div>
                ) : (
                    <div>
                        {/* Navigation for logged-in users */}
                        <nav>
                           
                            <Link to="/dashboard-d">Dashboard D</Link>
                            <Link to="/user-management">User Management</Link>
                            <Link to="/product-management">Product Management</Link> {/* New Link for Product Management */}
                        </nav>
                        <Routes>
          
                            <Route path="/dashboard-d" element={<DashboardD />} />
                            <Route path="/user-management" element={<UserManagement />} />
                            <Route path="/product-management" element={<ProductManagement />} /> {/* New Route */}
                        </Routes>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;

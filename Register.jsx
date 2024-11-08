import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // State for holding user input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to backend for registration
            const response = await fetch('http://localhost:3003/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the type of content being sent
                },
                body: JSON.stringify({ username, password }), // Convert JavaScript object to JSON string
            });

            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                throw new Error(errorData.message || 'Error registering user');
            }

            const data = await response.json(); // Parse the success response
            alert('User registered successfully!'); // Alert upon success
            // Redirect to login page on successful registration
            navigate('/login');
        } catch (error) {
            // Show error message if registration fails
            alert('Error registering user: ' + error.message);
        }
    };

    return (
        <div className="container register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setLoggedInUser, users, setUsers }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            const existingUser = users.find(user => user.username === username);
            if (!existingUser) {
                setUsers([...users, { username, password }]);
                alert('Registration successful! You can now log in.');
                setIsRegistering(false);
            } else {
                alert('Username already exists.');
            }
        } else {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                setLoggedInUser(user);
                navigate('/dashboard');
            } else {
                alert('Invalid username or password');
            }
        }
    };

    return (
        <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
        </div>
    );
};

export default Auth;

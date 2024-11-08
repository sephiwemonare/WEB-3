import React, { useState } from 'react';
import './um.css';  // Ensure styles are imported


const UserManagement = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleAddUser = (e) => {
        e.preventDefault();
        const newUser = { username, password };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleDeleteUser = (usernameToDelete) => {
        const updatedUsers = users.filter(user => user.username !== usernameToDelete);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Add User</button>
            </form>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.username}
                        <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;

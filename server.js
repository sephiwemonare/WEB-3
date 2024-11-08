const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3003;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '901017200',
    database: 'Inventory_System'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Registration route
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check for empty fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error occurred.' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);  // Improved salt rounds for security

        // Save user to the database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user.' });
            }
            return res.status(201).json({ message: 'User registered successfully!' });
        });
    });
});
// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input data
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        const user = results[0];
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Respond with user data (you might want to exclude password in production)
        return res.status(200).json({ username: user.username });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
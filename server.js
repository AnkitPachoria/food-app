const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const productRoutes = require('./routes/product-routes');
const adminRoutes = require('./routes/adminRoutes');

require('dotenv').config();

// Import the db connection
const db = require('./db'); // Ensure db.js exists and properly configures the connection
const userController = require('./controllers/user-controller');

const app = express();
const port = process.env.PORT || 5000;

// CORS ko allow karne ke liye explicitly configuration
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend ka URL
  methods: ['GET', 'POST'],        // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
}));

// Middleware
app.use(bodyParser.json());

// Define the authenticateUser middleware function
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token.');
    }
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Call next middleware or route handler
  });
};

// Routes
// Route to fetch all users (for testing purposes, ideally should be restricted)
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching users');
    }
    res.json(result);
  });
});

// Signup route
app.post('/signup', userController.signup);

// Login route (Now generating JWT token)
app.post('/login', userController.login);

// Protected route
app.get('/profile', authenticateUser, (req, res) => {
  // If we are here, it means the token is valid
  res.status(200).json({ message: 'Profile data', user: req.user });
});

// Use product routes for handling products
app.use('/api', productRoutes);
// Use the admin routes
app.use('/api/admin', adminRoutes);
// Fetch products by category
app.get('/products', (req, res) => {
  const { category } = req.query;
  const query = 'SELECT * FROM products WHERE category = ?';

  db.query(query, [category], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching products' });
    }
    res.status(200).json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

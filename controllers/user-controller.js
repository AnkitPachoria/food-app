const jwt = require('jsonwebtoken');
const db = require('../db'); // Ensure the db connection is exported from a separate db.js file (see step below)

// signup 
// signup 
const signup = (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error creating user');
    }

    // After successful signup, generate a JWT token
    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.status(201).json({ token });
  });
};
// login 
const login = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error occurred while logging in');
    }

    if (result.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = result[0];

    if (user.password === password) { // You should hash passwords in real apps
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ token }); // Send the token in response
    } else {
      return res.status(401).send('Invalid credentials');
    }
  });
};

module.exports = { signup, login };

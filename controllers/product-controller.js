const db = require('../db');

// Get all products
const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ message: 'Error fetching products' });
    } else {
      res.status(200).json(result);
    }
  });
};

// Get product by ID
// controllers/product-controller.js
const getProductById = (req, res) => {
    const productId = req.params.productId;
    const query = 'SELECT * FROM products WHERE id = ?';
    
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error('Error fetching product:', err);
        return res.status(500).json({ message: 'Error fetching product' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(result[0]); // Return the first product (ID is unique)
    });
  };
  

// controllers/product-controller.js
const viewProduct = (req, res) => {
    const { id, title, description, price, image } = req.body; // Expecting data in the body
  
    // Make sure all required fields are present
    if (!id || !title || !description || !price || !image) {
      return res.status(400).json({ message: 'Missing required product fields' });
    }
  
    // Assuming you have a table called "products" to save viewed products
    const query = 'INSERT INTO products (id, title, description, price, image) VALUES (?, ?, ?, ?, ?)';
  
    // Perform the query to insert data into the database
    db.query(query, [id, title, description, price, image], (err, result) => {
      if (err) {
        console.error('Error saving viewed product:', err); // Log the error
        return res.status(500).json({ message: 'Error saving viewed product' });
      }
  
      // If successful, respond with a success message
      res.status(200).json({ message: 'Product saved successfully' });
    });
  };
  
// Export functions




// controllers/productController.js



// Controller to add a product
const addProduct = (req, res) => {
  const { title, description, price, quantity = 1 } = req.body;
  const image = req.file; // Assuming the image is uploaded as 'image'

  // Check if all required fields are present
  if (!title || !description || !price || !image) {
    return res.status(400).json({ message: 'Missing required product fields' });
  }

  // The query to insert a new product into the 'products' table
  const query = `
    INSERT INTO products (title, description, price, image, quantity)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [title, description, price, image.path, quantity];

  // Execute the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
    res.status(200).json({ message: 'Product added successfully' });
  });
};
module.exports = { getAllProducts, getProductById, viewProduct,addProduct };

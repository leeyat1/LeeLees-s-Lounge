const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Create and connect to the SQLite database
const db = new sqlite3.Database('shopping_cart.db');

// Create a "products" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL
  )
`);

// Create a "cart" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY,
    productId INTEGER,
    FOREIGN KEY (productId) REFERENCES products(id)
  )
`);

app.use(express.static('public'));

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API endpoint to add a product to the cart
app.post('/api/cart/:productId', (req, res) => {
    const productId = req.params.productId;
    db.run('INSERT INTO cart (productId) VALUES (?)', [productId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// API endpoint to get the cart items
app.get('/api/cart', (req, res) => {
    db.all('SELECT * FROM cart JOIN products ON cart.productId = products.id', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

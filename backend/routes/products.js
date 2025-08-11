const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts } = require('../controllers/productController');

router.get('/products', getAllProducts);

router.get('/products/:id', (req, res) => {
  res.send(`Get product with ID: ${req.params.id}`);
});

router.post('/products', createProduct);

router.put('/products/:id', (req, res) => {
  res.send(`Product updated: ${req.params.id}`);
});

router.delete('/products/:id', (req, res) => {
  res.send(`Product deleted: ${req.params.id}`);
});

module.exports = router;

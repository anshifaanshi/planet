const express = require('express');
const router = express.Router();

const { addToCart,getall } = require('../controllers/cartController');

// Get all cart items
router.get('/getall', getall)
// Add item to cart
router.post('/cart', addToCart);

// Update cart item by ID
router.put('/:itemId', (req, res) => {
  res.send(`Update cart item: ${req.params.itemId}`);
});

// Remove cart item by ID
router.delete('/:itemId', (req, res) => {
  res.send(`Remove cart item: ${req.params.itemId}`);
});

module.exports = router;

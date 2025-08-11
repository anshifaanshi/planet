const express = require('express');
const router = express.Router();
const { createEvent, getall } = require('../controllers/eventController');

router.get('/events', getall);

router.post('/createevents', createEvent);

router.put('/events/:id', (req, res) => {
  res.send(`Update event: ${req.params.id}`);
});

router.delete('/events/:id', (req, res) => {
  res.send(`Delete event: ${req.params.id}`);
});

module.exports = router;

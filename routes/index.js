const express = require('express');
const router = express.Router();
const contactsRoutes = require('./contacts');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

router.use('/contacts', contactsRoutes);

router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const contactsRoutes = require('./contacts');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Contacts']
  res.send('Hello World');
});

router.use('/contacts', contactsRoutes);


module.exports = router;

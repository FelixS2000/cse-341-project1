const express = require('express');
const router = express.Router();

const usersController = require('../controllers/contacts');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.create);

router.put('/:id', usersController.update);

router.delete('/:id', usersController.delete);

module.exports = router;
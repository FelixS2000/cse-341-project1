const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Fetch all contacts
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contacts = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find()
      .toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: error.message });
  }
};

// Fetch a single contact by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const userId = new ObjectId(req.params.id);
    const contact = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .findOne({ _id: userId });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact', details: error.message });
  }
};

// Create a new contact
const createUser = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .insertOne(user);
    res.status(201).json({ message: 'Contact created successfully', contactId: response.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact', details: error.message });
  }
};

// Update an existing contact
const updateUser = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const userId = new ObjectId(req.params.id);
    const updatedData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, updatedData);
    if (response.modifiedCount === 0) {
      return res.status(404).json({ error: 'Contact not found or no changes made' });
    }
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact', details: error.message });
  }
};

// Delete a contact
const deleteUser = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .deleteOne({ _id: userId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact', details: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};

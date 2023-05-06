const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// Get requests
router.get('/', contactsController.getContacts);
router.get('/:id', contactsController.getContactById);

// Post requests
router.post('/', contactsController.createContact);

// Put requests
router.put('/:id', contactsController.updateContact);

// Delete requests
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
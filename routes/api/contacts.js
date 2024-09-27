const express = require('express');
const router = express.Router();
const contactsController = require('../../controller/contacts');

router.get('/', contactsController.getContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', contactsController.addContact);

router.delete('/:contactId', contactsController.removeContact);

router.put('/:contactId', contactsController.updateContact);

module.exports = router;

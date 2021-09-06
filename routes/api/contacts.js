const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model');
/* eslint-disable-next-line */
const router = express.Router();

const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contacts');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateCreateContact, addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateUpdateContact, updateContact);

module.exports = router;

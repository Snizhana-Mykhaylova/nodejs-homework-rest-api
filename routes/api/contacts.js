/* eslint-disable indent*/
const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../model');
/* eslint-disable-next-line */
const router = express.Router();

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require('../../validation/contacts');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateCreateContact, addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateUpdateContact, updateContact);

router.patch(
  '/:contactId/favorite',
  validateUpdateStatusContact,
  updateStatusContact
);

module.exports = router;

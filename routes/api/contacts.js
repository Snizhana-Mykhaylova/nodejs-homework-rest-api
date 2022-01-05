/* eslint-disable indent*/
const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts');
/* eslint-disable-next-line */
const router = express.Router();

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require('../../validation/contacts');

const guard = require('../../helpers/guard');

router.get('/', guard, listContacts);

router.get('/:contactId', guard, getContactById);

router.post('/', guard, validateCreateContact, addContact);

router.delete('/:contactId', guard, removeContact);

router.put('/:contactId', guard, validateUpdateContact, updateContact);

router.patch(
  '/:contactId/favorite',
  guard,
  validateUpdateStatusContact,
  updateStatusContact
);

module.exports = router;

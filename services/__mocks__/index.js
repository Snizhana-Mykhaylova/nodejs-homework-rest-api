const {contacts} = require('./data-contacts');

const mockGetAll = jest.fn(() => {
  return {
    contacts,
    total: contacts.length,
    limit: 5,
    page: 1,
  };
});
/* eslint-disable indent*/
const mockGetById = jest.fn((userId, {contactId}) => {
  const [contact] = contacts.filter(
    contact => String(contact._id) === String(contactId)
  );
  return contact;
});
const mockCreate = jest.fn((userId, body) => {
  contacts.push({...body, _id: '5555afe2b111ab18f74f0'});
  return {...body, _id: '5555afe2b111ab18f74f0'};
});
const mockRemove = jest.fn((userId, {contactId}) => {
  const index = contacts.findIndex(
    contact => String(contact._id) === String(contactId)
  );
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    return contact;
  }
  return null;
});
const mockUpdate = jest.fn((userId, {contactId}, body) => {
  const [contact] = contacts.filter(
    contact => String(contact._id) === String(contactId)
  );
  if (contact) {
    contact.name = body.name;
  }
  return contact;
});
const mockStatus = jest.fn();

const ContactService = jest.fn().mockImplementation(() => {
  return {
    getAll: mockGetAll,
    getById: mockGetById,
    create: mockCreate,
    remove: mockRemove,
    update: mockUpdate,
    updateStatus: mockStatus,
  };
});
const AuthService = jest.fn().mockImplementation(() => {
  return {
    logIn: jest.fn(),
    logOut: jest.fn(),
  };
});
const UsersService = jest.fn().mockImplementation(() => {
  return {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findByID: jest.fn(),
    updateAvatar: jest.fn(),
  };
});

module.exports = {ContactService, AuthService, UsersService};

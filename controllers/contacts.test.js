const contacts = require('./contacts');
const {HttpCode} = require('../helpers/constants');
const {ContactService} = require('../services');
const {
  contacts: fakeData,
  newContact,
} = require('../services/__mocks__/data-contacts');
jest.mock('../services');

describe('Unit testing contacts controller', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {user: {id: 1}};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(data => data),
    };
    next = jest.fn();
  });
  test('should get all contacts', async () => {
    const result = await contacts.listContacts(req, res, next);
    expect(ContactService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 'success');
    expect(result).toHaveProperty('code', 200);
    expect(result).toHaveProperty('data');
  });
  test('schould get error', async () => {
    await contacts.listContacts({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
  test('schould  found contact by id', async () => {
    const {_id, name, email, phone, favorite} = fakeData[0];
    req.params = {contactId: _id};
    const result = await contacts.getContactById(req, res, next);
    expect(ContactService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id', _id);
    expect(result.data.contact).toHaveProperty('name', name);
    expect(result.data.contact).toHaveProperty('email', email);
    expect(result.data.contact).toHaveProperty('phone', phone);
    expect(result.data.contact).toHaveProperty('favorite', favorite);
  });
  test('schould  found contact by wrong id', async () => {
    req.params = {contactId: 1};
    await contacts.getContactById(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      code: HttpCode.NOT_FOUND,
      message: 'Not found contact',
      data: 'Not found',
    });
  });
  test('schould  add contact', async () => {
    const {name, email, phone, favorite} = newContact;
    req.body = newContact;
    const result = await contacts.addContact(req, res, next);
    expect(ContactService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id');
    expect(result.data.contact).toHaveProperty('name', name);
    expect(result.data.contact).toHaveProperty('email', email);
    expect(result.data.contact).toHaveProperty('phone', phone);
    expect(result.data.contact).toHaveProperty('favorite', favorite);
  });
  test('schould  update contact', async () => {
    const {_id, email, phone, favorite} = fakeData[0];
    req.params = {contactId: _id};
    const newName = newContact.name;
    req.body = {name: newName};
    const result = await contacts.updateContact(req, res, next);
    expect(ContactService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id', _id);
    expect(result.data.contact).toHaveProperty('name', newName);
    expect(result.data.contact).toHaveProperty('email', email);
    expect(result.data.contact).toHaveProperty('phone', phone);
    expect(result.data.contact).toHaveProperty('favorite', favorite);
  });
  test('schould  update contact by wrong id', async () => {
    req.params = {contactId: 1};
    await contacts.updateContact(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      code: HttpCode.NOT_FOUND,
      message: 'Not found contact',
      data: 'Not found',
    });
  });
  test('schould  remove contact', async () => {
    const {_id, name, email, phone, favorite} = fakeData[0];
    req.params = {contactId: _id};
    const result = await contacts.removeContact(req, res, next);

    expect(ContactService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id', _id);
    expect(result.data.contact).toHaveProperty('name', name);
    expect(result.data.contact).toHaveProperty('email', email);
    expect(result.data.contact).toHaveProperty('phone', phone);
    expect(result.data.contact).toHaveProperty('favorite', favorite);
  });
  test('schould  remove contact by wrong id', async () => {
    req.params = {contactId: 1};
    await contacts.removeContact(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      code: HttpCode.NOT_FOUND,
      message: 'Not found contact',
      data: 'Not found',
    });
  });
});

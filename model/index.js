const {HttpCode} = require('../helpers/constants');
const {ContactService} = require('../services');
const contactService = new ContactService();

const listContacts = (req, res, next) => {
  try {
    const contacts = contactService.getAll();
    res.status(HttpCode.OK).json({
      status: 'seccess',
      code: HttpCode.OK,
      data: {contacts},
    });
  } catch (err) {
    next(err);
  }
};
const getContactById = (req, res, next) => {
  try {
    const contact = contactService.getById(req.params.contactId);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'seccess',
        code: HttpCode.OK,
        data: {contact},
      });
    }
    return next({
      code: HttpCode.NOT_FOUND,
      message: 'Not found contact',
      data: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};
const addContact = (req, res, next) => {
  try {
    const contact = contactService.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'seccess',
      code: HttpCode.CREATED,
      data: {contact},
    });
  } catch (err) {
    next(err);
  }
};
const removeContact = (req, res, next) => {
  try {
    const contact = contactService.remove(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'seccess',
        code: HttpCode.OK,
        message: 'contact deleted',
        data: {contact},
      });
    } else {
      return next({
        code: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not found',
      });
    }
  } catch (err) {
    next(err);
  }
};
const updateContact = (req, res, next) => {
  try {
    const contact = contactService.update(req.params, req.body);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'seccess',
        code: HttpCode.OK,
        data: {contact},
      });
    } else {
      return next({
        code: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not found',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

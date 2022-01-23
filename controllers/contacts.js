const {HttpCode} = require('../helpers/constants');
const {ContactService} = require('../services');
const contactService = new ContactService();

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactService.getAll(userId, req.query);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {...contacts},
    });
  } catch (err) {
    next(err);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactService.getById(userId, req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
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
const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactService.create(userId, req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {contact},
    });
  } catch (err) {
    next(err);
  }
};
const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactService.remove(userId, req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
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
const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactService.update(userId, req.params, req.body);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
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

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactService.updateStatus(
      userId,
      req.params,
      req.body
    );
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
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
  updateStatusContact,
};

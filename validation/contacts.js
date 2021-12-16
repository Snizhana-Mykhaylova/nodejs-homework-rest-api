/* eslint-disable indent*/
const Joi = require('joi');
const {HttpCode} = require('../helpers/constants');

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().min(7).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    })
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    })
    .optional(),
}).min(1);

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const {error} = schema.validate(body);
  if (error) {
    const [{message}] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      code: 400,
      message: message,
      data: message,
    });
  }
  next();
};
module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};
module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
module.exports.validateUpdateStatusContact = (req, res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next);
};

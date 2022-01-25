const Joi = require('joi');
/* eslint-disable indent*/
const schemaRegLogUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca']},
    })
    .pattern(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    )
    .required(),
  password: Joi.string().required(),
});

const schemaReVerifyUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca']},
    })
    .pattern(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    )
    .required(),
});

const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body);

  if (validationBody.error) {
    return res
      .status(400)
      .json({message: validationBody.error.message.replace(/"/g, '')});
  }
  next();
};

module.exports = {
  regLogValidation: (req, res, next) => {
    return validate(schemaRegLogUser, res, req, next);
  },

  reVerifyValidation: (req, res, next) => {
    return validate(schemaReVerifyUser, res, req, next);
  },
};

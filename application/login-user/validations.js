const Joi = require('joi');

const scheme = Joi.object({
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'El Número de Teléfono debe contener solo dígitos.'
    }),
  username: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'El Nombre de Usuario no debe contener caracteres especiales.'
    }),
  password: Joi.string()
    .max(20)
    .required()
});

const validateData = async (data) => {
  try {
    await scheme.validateAsync(data, { abortEarly: false });
    return data;
  } catch (error) {
    throw error.details.map((err) => ({ campo: err.path[0], message: err.message }));
  }
};

module.exports = validateData;

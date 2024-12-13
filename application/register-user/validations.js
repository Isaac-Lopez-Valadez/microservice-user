const Joi = require('joi');

const scheme = Joi.object({
  name: Joi.string()
    .max(40)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'El Nombre no debe contener caracteres especiales.'
    }),
  lastName1: Joi.string()
    .max(40)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'El Apellido Paterno no debe contener caracteres especiales.'
    }),
  lastName2: Joi.string()
    .max(40)
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      'string.pattern.base': 'El Apellido Materno no debe contener caracteres especiales.'
    }),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.pattern.base': 'El Número de Teléfono debe contener solo dígitos.'
    }),
  email: Joi.string()
    .max(40)
    .email()
    .messages({
      'string.email': 'El Correo debe ser un formato válido.'
    }),
  username: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
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

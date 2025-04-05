const Joi = require('joi');

// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('user', 'moderator', 'admin', 'superadmin').required(),
        gender: Joi.string().valid('male', 'female').required(),
        phone: Joi.number().required()
    });
    return schema.validate(data, { abortEarly: false });
};

// Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data, { abortEarly: false });
};

const postValidationSchema = (data) => {
   const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string()).optional(),
  });
  return schema.validate(data, { abortEarly: false });
};
module.exports = {
    registerValidation,
    loginValidation,
    postValidationSchema
}
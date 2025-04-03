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

module.exports = {
    registerValidation,
    loginValidation
}
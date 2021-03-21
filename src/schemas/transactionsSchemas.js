const Joi = require('joi');

const transaction = Joi.object({
    item: Joi.string().alphanum().required(),
    cost: Joi.string().pattern(/[0-9,]/).required(),
    selectDate: Joi.string().pattern(/[0-9-]/).required(),
    type: Joi.string().valid('input', 'output').required(),
});

module.exports = {
    transaction,
};

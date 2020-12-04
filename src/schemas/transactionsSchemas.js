const Joi = require('joi');

const transaction = Joi.object({
    item: Joi.string().alphanum().required(),
    cost: Joi.string().pattern(/[0-9,]/).required()
});

module.exports = {
    transaction
};
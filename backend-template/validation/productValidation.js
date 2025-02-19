import Joi from "joi";

// schema validation fucntion for product creation update and delete

export const productValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().min(1).required(),
    category: Joi.string().required(),
});

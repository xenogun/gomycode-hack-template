import Joi from "joi";


export const careateOrderSchema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    adress: joi.string(),
    quantity: Joi.number().integer().min(1).required(),
    postalCode: Joi.number()
        .pattern(/^\d{5}$/)
        .required(),
    phoneNumber: Joi.number()
        .pattern(/^\+?\d{10,15}$/)
        .required(),
});

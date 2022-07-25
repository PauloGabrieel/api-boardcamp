import Joi from "joi";

export function customerValidation(customer){
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(10).max(11).required(),
        cpf: Joi.string().pattern(new RegExp('^[0-9]{11}$')),
        birthday: Joi.date().less('now').required()
    })
    return schema.validate(customer,{abortEarly:false})
};
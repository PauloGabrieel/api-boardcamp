import Joi from "joi";

export async function categoryValidation(name){

    const schema = Joi.string().required().trim();
    
    return schema.validate(name);
}
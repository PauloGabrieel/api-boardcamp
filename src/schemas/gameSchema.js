import Joi from "joi";

export function gameValidation(game){
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        stockTotal: Joi.number().greater(0).required(),
        categoryId: Joi.number().greater(0).required(),
        pricePerDay: Joi.number().greater(0).required()
    });

    return schema.validate(game,{abortEarly:false});
};


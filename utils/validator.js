const Joi = require("joi");

const validateMenu = (data) => {
    const schema = Joi.object({
        menuCategory: Joi.string().required(),
        menuItems: Joi.array().items(
            Joi.object({
                itemName: Joi.string().required(),
                itemDescription: Joi.string(),
                itemPrice: Joi.number().required(),
            })
        ),
    });

    return schema.validate(data);
    // return ('what')
};

const validateMenuItems = (data) => {
    const schema = Joi.object({
        itemName: Joi.string().required(),
        itemDescription: Joi.string(),
        itemPrice: Joi.number().required(),
    });

    return schema.validate(data);

};

module.exports = { validateMenu, validateMenuItems };
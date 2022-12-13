const Joi = require("joi");

const NewEmailValidation = (data) => {
    const schema = Joi.object({
        oldEmail: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
            })
            .messages({
                "string.empty": "Email cannot be an empty field",
                "string.email": "Email must be a valid email",
                "string.required": "Email is a required field",
                "any.required": "Current Email is a required field",
            }),
        newEmail: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
            })
            .messages({
                "string.empty": "Email cannot be an empty field",
                "string.email": "Email must be a valid email",
                "string.required": "Email is a required field",
                "any.required": "New Email is a required field",
            }),
    });
    return schema.validate(data);
};

module.exports.NewEmailValidation = NewEmailValidation;

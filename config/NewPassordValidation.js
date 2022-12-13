const Joi = require("joi");

const NewPasswordValidation = (data) => {
    const schema = Joi.object({
        newPassword: Joi.string()
            .min(8)
            .required()
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                )
            )
            .messages({
                "string.min": "Password length must be at least 8 characters",
                "string.pattern.base":
                    "The password must contain at least one lowercase, one uppercase, one numeric character, one special character",
                "string.required": "Password is a required",
                "string.empty": "Password is not allowed to be empty",
                "any.required": "Password is not allowed to be empty",
            }),
        confirmNewPassword: Joi.any()
            .equal(Joi.ref("newPassword"))
            .required()
            .label("Confirm password")
            .options({
                messages: {
                    "any.only": "Confirm password does not match",
                    "any.required": "Please confirm your password",
                },
            }),
    });
    return schema.validate(data);
};

module.exports.NewPasswordValidation = NewPasswordValidation;

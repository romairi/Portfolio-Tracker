import Joi from "joi";
import {
  CONFIRM_PASSWORD_FIELD,
  EMAIL_FIELD,
  EMAIL_VALID_NAMES,
  PASSWORD_FIELD,
  USERNAME_FIELD,
} from "./constants";

export const schemaRegistration = Joi.object({
  [USERNAME_FIELD]: Joi.string().alphanum().min(3).max(15).required(),
  [EMAIL_FIELD]: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: EMAIL_VALID_NAMES } })
    .required(),
  [PASSWORD_FIELD]: Joi.string().min(7).required(),
  [CONFIRM_PASSWORD_FIELD]: Joi.ref(PASSWORD_FIELD),
});

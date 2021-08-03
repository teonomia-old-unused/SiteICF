import * as Joi from 'joi';

const email = Joi.string().email().required().messages({ 'string.email': '"email" precisa ser um email válido.' });
const telephone = Joi.string().required();
const password = Joi.string().required();

export const register = Joi.object({
  email,
  password,
  telephone,
});

export async function validate(objectToValidate:Object, schema:Joi.Schema):Promise<Object> {
  return schema.validateAsync(objectToValidate);
}

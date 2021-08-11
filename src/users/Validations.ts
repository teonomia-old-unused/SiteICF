import * as Joi from 'joi';

const username = Joi.string().required();
const email = Joi.string().email().required();
const password = Joi.string().required();
const code = Joi.string().required();

export const register = Joi.object({
  username,
  email,
  password,
});
export const login = Joi.object({
  username,
  password
})
export const confirmSignUp = Joi.object({
  username,
  code
})
export const resendConfirmationCode = Joi.object({
  username
})
export const refreshToken = Joi.object({
  refreshToken: code
})
export const forgotPassword = Joi.object({
  username
})
export const confirmForgotPassword = Joi.object({
  code,
  password,
  username
})

export async function validate(objectToValidate:Object, schema:Joi.Schema):Promise<Object> {
  return schema.validateAsync(objectToValidate);
}

const CLIENT_ID = process.env.CLIENT_ID

import { CognitoIdentityServiceProvider } from 'aws-sdk';
const cognito = new CognitoIdentityServiceProvider()

export async function signUp ({ username, email, password }) {
  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'custom:username', Value: username }
    ]
  }
  let result
  try {
    result = await cognito.signUp(params).promise()
  } catch (e) {
    if (e.message && e.statusCode) return { body: e.message, statusCode: e.statusCode }
    return { body:'Error', statusCode: 500}
  }
  return { body: result, statusCode: 200 }
}

export async function login ({ username: USERNAME, password: PASSWORD }) {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME,
      PASSWORD
    },
    ClientId: CLIENT_ID
  }
  let result
  try {
    result = await cognito.initiateAuth(params).promise()
  } catch (e) {
    console.log(`${e.message}`)
    if (e.message && e.statusCode) return { body: e.message, statusCode: e.statusCode }
    return { body:'Error', statusCode: 500}
  }
  return { body: result, statusCode: 200 }
}

export async function confirmSignUp ({username:Username, code: ConfirmationCode}) {
  const params = {
    ClientId: CLIENT_ID,
    Username,
    ConfirmationCode
  }
  let result
  try {
    result = await cognito.confirmSignUp(params).promise()
  } catch (e) {
    if (e.message && e.statusCode) return { body: e.message, statusCode: e.statusCode }
    return { body:'Error', statusCode: 500}
  }
  return { body: result, statusCode: 200 }
}

export async function resendConfirmationCode ({username:Username}) {
  const params = {
    ClientId: CLIENT_ID,
    Username
  }
  let result
  try {
    result = await cognito.resendConfirmationCode(params).promise()
  } catch (e) {
    if (e.message && e.statusCode) return { body: e.message, statusCode: e.statusCode }
    return { body:'Error', statusCode: 500}
  }
  return { body: result, statusCode: 200 }
}

export async function refreshToken ({refreshToken: REFRESH_TOKEN}) {
  const params = {
    AuthFlow: 'REFRESH_TOKEN',
    AuthParameters: {
      REFRESH_TOKEN
    },
    ClientId: CLIENT_ID
  }
  let result
  try {
    result = await cognito.initiateAuth(params).promise()
  } catch (e) {
    if (e.message && e.statusCode) return { body: e.message, statusCode: e.statusCode }
    return { body:'Error', statusCode: 500}
  }
  return { body: result, statusCode: 200 }
}

export async function forgotPassword ({username: Username}) {
  const params = {
    Username,
    ClientId: CLIENT_ID
  }
  let result
  try {
    result = await cognito.forgotPassword(params).promise()
  } catch (e) {
    if (e.message && e.statusCode) return { body: e.message, statusCode: e.statusCode }
    return { body:'Error', statusCode: 500}
  }
  return { body: result, statusCode: 200 }
}

export async function confirmForgotPassword ({code: ConfirmationCode, password: Password, username: Username }) {
  const params = {
    ClientId: CLIENT_ID,
    ConfirmationCode,
    Password,
    Username
  }
  let result
  try {
    result = await cognito.confirmForgotPassword(params).promise()
  } catch (e) {
    if (e.message && e.statusCode) return { body: e.message, statusCode: e.statusCode }
    return { body:'Error', statusCode: 500}
  }
  return { body: result, statusCode: 200 }
}
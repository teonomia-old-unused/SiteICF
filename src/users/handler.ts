import ServerlessHandler from './ServerlessHandler';

export const { 
  register, 
  login, 
  confirmSignUp, 
  resendConfirmationCode, 
  refreshToken, 
  forgotPassword, 
  confirmForgotPassword 
} = ServerlessHandler;

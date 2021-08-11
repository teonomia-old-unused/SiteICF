import * as Validations from './Validations'
import { parseBody , responseFormater, validateBody } from './Decorators'
import { 
  signUp, 
  login, 
  confirmSignUp, 
  resendConfirmationCode, 
  refreshToken, 
  forgotPassword, 
  confirmForgotPassword 
} from './Model'

export default class ServerlessHandler {
  @parseBody
  @validateBody(Validations.register)
  @responseFormater
  static async register(event: any): Promise<ApiGatewayReturn> {
    const body = event.body
    return signUp(body)
  }

  @parseBody
  @validateBody(Validations.login)
  @responseFormater
  static async login(event: any): Promise<ApiGatewayReturn> {
    const body = event.body
    return login(body)
  }

  @parseBody
  @validateBody(Validations.confirmSignUp)
  @responseFormater
  static async confirmSignUp(event: any): Promise<ApiGatewayReturn> {
    const body = event.body
    return confirmSignUp(body)
  }

  @parseBody
  @validateBody(Validations.resendConfirmationCode)
  @responseFormater
  static async resendConfirmationCode(event: any): Promise<ApiGatewayReturn> {
    const body = event.body
    return resendConfirmationCode(body)
  }

  @parseBody
  @validateBody(Validations.refreshToken)
  @responseFormater
  static async refreshToken(event: any): Promise<ApiGatewayReturn> {
    const body = event.body
    return refreshToken(body)
  }

  @parseBody
  @validateBody(Validations.forgotPassword)
  @responseFormater
  static async forgotPassword(event: any): Promise<ApiGatewayReturn> {
    const body = event.body
    return forgotPassword(body)
  }
  
  @parseBody
  @validateBody(Validations.confirmForgotPassword)
  @responseFormater
  static async confirmForgotPassword(event: any): Promise<ApiGatewayReturn> {
    const body = event.body
    return confirmForgotPassword(body)
  }
}

interface ApiGatewayReturn {
  body: object | string,
  statusCode?: number,
  headers?: object
}
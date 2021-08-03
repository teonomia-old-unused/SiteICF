import * as Validations from './Validations'

const { validate } = Validations;

interface ApiGatewayParams {
  version: string,
  routeKey: string,
  rawPath: string,
  rawQueryString: string,
  cookies: string[],
  headers: object,
  queryStringParameters: object,
  requestContext: {
    accountId: string,
    apiId: string,
    authentication?: {
      clientCert: {
        clientCertPem: string,
        subjectDN: string,
        issuerDN: string,
        serialNumber: string,
        validity: {
          notBefore: string,
          notAfter: string
        }
      }
    },
    authorizer?: {
      jwt: {
        claims: object,
        scopes: string[]
      }
    },
    domainName: string,
    domainPrefix: string,
    http: {
      method: string,
      path: string,
      protocol: string,
      sourceIp: string,
      userAgent: string
    },
    requestId: string,
    routeKey: string,
    stage: string,
    time: string,
    timeEpoch: string
  },
  body: string,
  pathParameters: object,
  isBase64Encoded: string,
  stageVariables: object
}
interface ApiGatewayReturn {
  body: object,
  statusCode?: number,
  headers?: object
}

function responseFormater(target, key, descriptor: PropertyDescriptor) {
  const originalFunction = descriptor.value;
  const newDescriptor = descriptor;
  newDescriptor.value = async function (...args) {
    const response = await originalFunction.apply(this, args);

    return {
      body: JSON.stringify(response.body),
      statusCode: response.statusCode || 200,
      headers: response.statusCode || {
        'Access-Control-Allow-Origin': '*',
      },
    };
  };

  return descriptor;
}
function parseBody(target, key, descriptor: PropertyDescriptor) {
  const originalFunction = descriptor.value;

  const newDescriptor = descriptor;
  newDescriptor.value = function (event:ApiGatewayParams) {
    const newEvent = { ...event, body: JSON.parse(event.body) };
    return originalFunction.apply(this, newEvent);
  };

  return descriptor;
}
function validateBody(schema) {
  return function (target, key, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value;
    const newDescriptor = descriptor;

    newDescriptor.value = async function (event) {
      validate(event.body, schema);
      return originalFunction.call(this, event);
    };

    return newDescriptor;
  };
}

export default class ServerlessHandler {
  @parseBody
  @validateBody(Validations.register)
  @responseFormater
  static async register(event: any): Promise<ApiGatewayReturn> {
    return { body: event.body };
  }
}

import * as Validations from './Validations'
const { validate } = Validations;

export function responseFormater(target, key, descriptor: PropertyDescriptor) {
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
export function parseBody(target, key, descriptor: PropertyDescriptor) {
  const originalFunction = descriptor.value;

  const newDescriptor = descriptor;
  newDescriptor.value = async function (event: ApiGatewayParams) {
    const newEvent = { ...event, body: JSON.parse(event.body) };
    return originalFunction.call(this, newEvent);
  };

  return descriptor;
}
export function validateBody(schema) {
  return function (target, key, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value;
    const newDescriptor = descriptor;

    newDescriptor.value = async function (event) {
      const bodyValidated = []
      try {
        bodyValidated[0] = await validate(event.body, schema)
      } catch (error) {
        return { body: JSON.stringify(error), statusCode: 400 }
      }
      return originalFunction.call(this, { ...event, body: bodyValidated[0] });
    };

    return newDescriptor;
  };
}

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
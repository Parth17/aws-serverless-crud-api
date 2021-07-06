import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import UserDtlsService from '../services/UserDtlsService'

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userDtlsService = new UserDtlsService()
  const items = await userDtlsService.getAllUserDtls();

  return {
    statusCode: 201,
    body: JSON.stringify({
      items
    })
  };
}
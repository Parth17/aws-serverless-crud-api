import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import UserDtlsService from '../services/UserDtlsService'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { name } = JSON.parse(event.body)

  const userDtlsService = new UserDtlsService()
  const userdtls = await userDtlsService.createUserDtls(name)

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: userdtls
    })
  };
}
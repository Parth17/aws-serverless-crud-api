import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import UserDtlsService from '../services/UserDtlsService'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id
  
  const userDtlsService = new UserDtlsService()
  await userDtlsService.deleteToUserDtlsById(id)

  return {
    statusCode: 200,
    body: ''
  }
}
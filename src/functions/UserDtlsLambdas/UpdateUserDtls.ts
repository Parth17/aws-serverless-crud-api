import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import UserDtlsService from '../services/UserDtlsService'
import { UserDtls } from '../models/UserDtls'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id

  const userDtlsService = new UserDtlsService()
  const todo: Partial<UserDtls> = { ...JSON.parse(event.body), id }

  const userDtlsUpdated = await userDtlsService.updateUserDtlsdo(todo)

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: userDtlsUpdated
    })
  }
}
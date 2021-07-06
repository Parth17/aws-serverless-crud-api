import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { UserDtls } from '../models/UserDtls'

export default class UserDtlsDao {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly userDtlsTable = process.env.USERDTLS_TABLE) {
  }

  async getAllUserDtlss(): Promise<UserDtls[]> {
    const result = await this.docClient.scan({
      TableName: this.userDtlsTable
    }).promise()

    return result.Items as UserDtls[]
  }

  async createUserDtls(userdtls: UserDtls): Promise<UserDtls> {
    await this.docClient.put({
      TableName: this.userDtlsTable,
      Item: userdtls
    }).promise()

    return userdtls
  }
  
  async updateUserDtls(partialuserdtls: Partial<UserDtls>): Promise<UserDtls> {
    const updated = await this.docClient.update({
      TableName: this.userDtlsTable,
      Key: { 'id': partialuserdtls.id },
      UpdateExpression: 'set #name = :name, done = :done',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': partialuserdtls.name,
        ':done': partialuserdtls.done
      },
      ReturnValues: 'ALL_NEW'
    }).promise()
    
    return updated.Attributes as UserDtls
  }
  
  async deleteUserDtlsById(id: string) {
    return this.docClient.delete({
      TableName: this.userDtlsTable,
      Key: { 'id': id }
    }).promise()
  }
}

function createDynamoDBClient() { 
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new AWS.DynamoDB.DocumentClient()
}
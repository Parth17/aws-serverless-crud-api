import * as uuid from 'uuid'

import UserDtlsDao from '../dao/UserDtlsDao'
import { UserDtls } from '../models/UserDtls'


export default class UserDtlsService {

  userDtlsDao: UserDtlsDao;

  constructor(userDtlsDao: UserDtlsDao = new UserDtlsDao()) {
    this.userDtlsDao = userDtlsDao
  }

  async getAllUserDtls(): Promise<UserDtls[]> {
    return this.userDtlsDao.getAllUserDtlss()
  }

  async createUserDtls(name: string): Promise<UserDtls> {
    const id = uuid.v4()

    return await this.userDtlsDao.createUserDtls({
      id,
      name,
      done: false,
      createdAt: new Date().toISOString()
    })
  }

  async updateUserDtlsdo(partialTodo: Partial<UserDtls>) {
    return await this.userDtlsDao.updateUserDtls(partialTodo)
  }

  async deleteToUserDtlsById(id: string) {
    return await this.userDtlsDao.deleteUserDtlsById(id)
  }
}
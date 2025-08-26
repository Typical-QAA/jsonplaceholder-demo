import { HEADERS } from '../support/constants/headers.js'
import { HTTP_STATUS } from '../support/constants/http-status.js'
import { APP_CONFIG } from '../environment/jsonplaceholder-api/app-configs/configuration.js'
import { RouteBase } from './base.js'

export class RouteUsers extends RouteBase {
  async getAllUsers() {
    return await this.sendAndVerify('GET', APP_CONFIG.USERS.ENDPOINTS.LIST_USERS, {}, HTTP_STATUS.OK, HEADERS.JSON)
  }

  async createNewUser(payload) {
    return this.sendAndVerify('POST', APP_CONFIG.USERS.ENDPOINTS.LIST_USERS, { data: payload }, HTTP_STATUS.CREATED, HEADERS.JSON)
  }

  async getUser(id, exists = true) {
    if (exists) {
      return this.sendAndVerify('GET', APP_CONFIG.USERS.ENDPOINTS.SINGLE_USER(id), {}, HTTP_STATUS.OK, HEADERS.JSON)
    } else {
      return this.sendAndVerify('GET', APP_CONFIG.USERS.ENDPOINTS.SINGLE_USER(id), {}, HTTP_STATUS.NOT_FOUND, HEADERS.JSON)
    }
  }

  async fullUpdateUser(id, payload) {
    return this.sendAndVerify('PUT', APP_CONFIG.USERS.ENDPOINTS.SINGLE_USER(id), { data: payload }, HTTP_STATUS.OK, HEADERS.JSON)
  }

  async partUpdateUser(id, payload) {
    return this.sendAndVerify('PATCH', APP_CONFIG.USERS.ENDPOINTS.SINGLE_USER(id), { data: payload }, HTTP_STATUS.OK, HEADERS.JSON)
  }

  async deleteUser(id) {
    return this.sendAndVerify('DELETE', APP_CONFIG.USERS.ENDPOINTS.SINGLE_USER(id), {}, HTTP_STATUS.OK, HEADERS.JSON)
  }
}

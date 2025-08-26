import { HEADERS } from '../support/constants/headers.js'
import { HTTP_STATUS } from '../support/constants/http-status.js'
import { APP_CONFIG } from '../environment/jsonplaceholder-api/app-configs/configuration.js'
import { RouteBase } from './base.js'

export class RoutePosts extends RouteBase {
  async getAllPosts() {
    return await this.sendAndVerify('GET', APP_CONFIG.POSTS.ENDPOINTS.LIST_POSTS, {}, HTTP_STATUS.OK, HEADERS.JSON)
  }

  async getAllPostsByUser(userId, exists = true) {
    if (exists) {
      return this.sendAndVerify('GET', `${APP_CONFIG.POSTS.ENDPOINTS.LIST_POSTS}?userId=${userId}`, {}, HTTP_STATUS.OK, HEADERS.JSON)
    } else {
      return this.sendAndVerify('GET', `${APP_CONFIG.POSTS.ENDPOINTS.LIST_POSTS}?userId=${userId}`, {}, HTTP_STATUS.NOT_FOUND, HEADERS.JSON)
    }
  }

  async getPost(id, exists = true) {
    if (exists) {
      return this.sendAndVerify('GET', APP_CONFIG.POSTS.ENDPOINTS.SINGLE_POST(id), {}, HTTP_STATUS.OK, HEADERS.JSON)
    } else {
      return this.sendAndVerify('GET', APP_CONFIG.POSTS.ENDPOINTS.SINGLE_POST(id), {}, HTTP_STATUS.NOT_FOUND, HEADERS.JSON)
    }
  }

  async createNewPost(payload) {
    return this.sendAndVerify('POST', APP_CONFIG.POSTS.ENDPOINTS.LIST_POSTS, { data: payload }, HTTP_STATUS.CREATED, HEADERS.JSON)
  }

  async fullUpdatePost(id, payload) {
    return this.sendAndVerify('PUT', APP_CONFIG.POSTS.ENDPOINTS.SINGLE_POST(id), { data: payload }, HTTP_STATUS.OK, HEADERS.JSON)
  }

  async partUpdatePost(id, payload) {
    return this.sendAndVerify('PATCH', APP_CONFIG.POSTS.ENDPOINTS.SINGLE_POST(id), { data: payload }, HTTP_STATUS.OK, HEADERS.JSON)
  }

  async deletePost(id) {
    return this.sendAndVerify('DELETE', APP_CONFIG.POSTS.ENDPOINTS.SINGLE_POST(id), {}, HTTP_STATUS.OK, HEADERS.JSON)
  }
}

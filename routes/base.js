import { expect, test } from '@playwright/test'
import '../support/matchers.js'

export class RouteBase {
  constructor(request) {
    this.request = request
  }

  async sendAndVerify(method, url, options = {}, expectedStatus, expectedHeaders) {
    let response
    let responseHeaders

    await test.step(`Send ${method} request to ${url}`, async () => {
      response = await this.request[method.toLowerCase()](url, options)
      responseHeaders = await response.headersArray()
    })
    await test.step(`Validate response status is ${expectedStatus}`, async () => {
      expect(response.status()).toBe(expectedStatus)
    })
    await test.step(`Validate response headers`, async () => {
      expect(responseHeaders).toEqual(expect.arrayContaining(expectedHeaders.map(header => expect.objectContaining(header))))
    })
    return response
  }
}

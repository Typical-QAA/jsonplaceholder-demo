import { faker } from '@faker-js/faker'
import { expect, test } from './fixtures.js'
import { APP_CONFIG } from '../../environment/jsonplaceholder-api/app-configs/configuration.js'
import { HTTP_STATUS } from '../../support/constants/http-status.js'

test.describe('Users API', () => {
  test.describe('Positive Scenarios', () => {
    test(`Should return a list of ${APP_CONFIG.USERS.USERS.COUNT} users`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const responseBody = await test.step(`Get all users`, async () => {
        return await (await routes.users.getAllUsers()).json()
      })
      await test.step('Verify response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.LIST))
      })
      await test.step('Validate user count', async () => {
        expect(responseBody).toHaveLength(APP_CONFIG.USERS.USERS.COUNT)
      })
    })

    test(`Should get user with id ${APP_CONFIG.USERS.USERS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const responseBody = await test.step(`Get user with id ${APP_CONFIG.USERS.USERS.ID_1}`, async () => {
        return await (await routes.users.getUser(APP_CONFIG.USERS.USERS.ID_1)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.SINGLE_USER))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.static(APP_CONFIG.USERS.FIXTURES.USER_1))
      })
    })

    test(`Should create a user with id ${APP_CONFIG.USERS.USERS.ID_11}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      // NOTE: using a fixture with id here as fake api does not create actual entities
      const requestData = testData.static(APP_CONFIG.USERS.FIXTURES.USER_11)

      const responseBody = await test.step('Create new user', async () => {
        return await (await routes.users.createNewUser(requestData)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.SINGLE_USER))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(requestData)
      })
    })

    test(`Should fully update user with id ${APP_CONFIG.USERS.USERS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const requestData = testData.generate.getUser()

      const responseBody = await test.step(`Fully update user with id ${APP_CONFIG.USERS.USERS.ID_1}`, async () => {
        return await (await routes.users.fullUpdateUser(APP_CONFIG.USERS.USERS.ID_1, requestData)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.SINGLE_USER))
      })
      await test.step('Validate response content matches fixture', async () => {
        requestData.id = APP_CONFIG.USERS.USERS.ID_1
        expect(responseBody).toEqual(requestData)
      })
    })

    test(`Should partially update user with id ${APP_CONFIG.USERS.USERS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const requestData = { email: faker.internet.email(), username: faker.internet.displayName() }
      const responseData = { ...testData.static(APP_CONFIG.USERS.FIXTURES.USER_1), ...requestData }

      const responseBody = await test.step(`Partially update user with id ${APP_CONFIG.USERS.USERS.ID_1}`, async () => {
        return await (await routes.users.partUpdateUser(APP_CONFIG.USERS.USERS.ID_1, requestData)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.SINGLE_USER))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(responseData)
      })
    })

    // TODO: add test case
    // NOTE: this test is here due to the implementation of fake api
    test(
      `Should replace the nested address object when partially updating user with id ${APP_CONFIG.USERS.USERS.ID_1}`,
      { tag: ['@todo-docs'] },
      async ({ routes, testData }) => {
        const requestData = { address: { city: faker.location.city() } }
        const responseData = { ...testData.static(APP_CONFIG.USERS.FIXTURES.USER_1), address: requestData.address }

        const responseBody = await test.step(`Partially update user with id ${APP_CONFIG.USERS.USERS.ID_1}`, async () => {
          return await (await routes.users.partUpdateUser(APP_CONFIG.USERS.USERS.ID_1, requestData)).json()
        })
        await test.step('Validate response schema', async () => {
          expect(responseBody).not.toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.SINGLE_USER))
        })
        await test.step('Validate response content', async () => {
          expect(responseBody).toEqual(responseData)
        })
      }
    )

    // NOTE: fake api does not actually delete entities
    test(`Should delete user with id ${APP_CONFIG.USERS.USERS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const responseBody = await test.step(`Delete user with id ${APP_CONFIG.USERS.USERS.ID_1}`, async () => {
        return await (await routes.users.deleteUser(APP_CONFIG.USERS.USERS.ID_1)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.EMPTY))
      })
    })
  })

  test.describe('Negative Scenarios', () => {
    test(
      `Should return ${HTTP_STATUS.NOT_FOUND} for a non-existent user with id ${APP_CONFIG.USERS.USERS.NON_EXISTENT_ID}`,
      { tag: ['@docs'] },
      async ({ routes, testData }) => {
        const responseBody = await test.step(`Get user with id ${APP_CONFIG.USERS.USERS.NON_EXISTENT_ID}`, async () => {
          return await (await routes.users.getUser(APP_CONFIG.USERS.USERS.NON_EXISTENT_ID, false)).json()
        })
        await test.step('Validate response schema', async () => {
          expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.EMPTY))
        })
      }
    )

    // TODO: add test case
    // NOTE: in a real world scenarios, endpoints should not have all methods allowed and throw HTTP 405
    test(
      `Should return ${HTTP_STATUS.NOT_FOUND} for DELETE request to user list endpoint`,
      { tag: ['@todo-docs'] },
      async ({ routes, testData }) => {
        const method = 'DELETE'
        const url = APP_CONFIG.USERS.ENDPOINTS.LIST_USERS

        const responseBody = await (await routes.users.sendAndVerify(method, url, {}, HTTP_STATUS.NOT_FOUND, [])).json()

        await test.step('Validate response schema', async () => {
          expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.EMPTY))
        })
      }
    )

    // NOTE: in a real world scenarios, endpoints should validate/sanitize such requests and throw HTTP 400
    test(
      `Should return ${HTTP_STATUS.INTERNAL_SERVER_ERROR} for a malformed JSON payload`,
      { tag: ['@docs'] },
      async ({ routes, testData }) => {
        const requestData = `{"name": "test"`
        const method = 'POST'
        const url = APP_CONFIG.USERS.ENDPOINTS.LIST_USERS

        await test.step('Create new user with malformed JSON', async () => {
          await routes.users.sendAndVerify(
            method,
            url,
            { data: requestData, headers: { 'Content-Type': 'application/json' } },
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            []
          )
        })
      }
    )
  })

  test.describe('Edge Cases', () => {
    // NOTE: in a real world scenarios, endpoints should have mandatory fields to accept, do validations and throw HTTP 400
    test(
      `Should create a user with id ${APP_CONFIG.USERS.USERS.ID_11} with empty body`,
      { tag: ['@docs'] },
      async ({ routes, testData }) => {
        const requestData = testData.static(APP_CONFIG.USERS.FIXTURES.EMPTY)

        const responseBody = await test.step('Create new user', async () => {
          return await (await routes.users.createNewUser(requestData)).json()
        })
        await test.step('Verify response schema is not empty and is not for a full single user', async () => {
          expect(responseBody).not.toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.EMPTY))
          expect(responseBody).not.toBeValidSchema(testData.schema(APP_CONFIG.USERS.SCHEMAS.SINGLE_USER))
        })
        await test.step('Validate response body content', async () => {
          expect(responseBody).toEqual(testData.static(APP_CONFIG.USERS.FIXTURES.USER_11_ID))
        })
      }
    )
  })
})

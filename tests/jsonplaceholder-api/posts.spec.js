import { faker } from '@faker-js/faker'
import { expect, test } from './fixtures.js'
import { APP_CONFIG } from '../../environment/jsonplaceholder-api/app-configs/configuration.js'
import { HTTP_STATUS } from '../../support/constants/http-status.js'

test.describe('Posts API', () => {
  test.describe('Positive Scenarios', () => {
    test(`Should return a list of ${APP_CONFIG.POSTS.POSTS.COUNT} posts`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const responseBody = await test.step(`Get all posts`, async () => {
        return await (await routes.posts.getAllPosts()).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.LIST))
      })
      await test.step('Validate post count', async () => {
        expect(responseBody).toHaveLength(APP_CONFIG.POSTS.POSTS.COUNT)
      })
    })

    test(`Should get post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const responseBody = await test.step(`Get post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, async () => {
        return await (await routes.posts.getPost(APP_CONFIG.POSTS.POSTS.ID_1)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.SINGLE_POST))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.static(APP_CONFIG.POSTS.FIXTURES.POST_1))
      })
    })

    test(`Should create a new post with id ${APP_CONFIG.POSTS.POSTS.ID_101}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      // NOTE: using a fixture with id here as fake api does not create actual entities
      const requestData = { userId: 1, id: 101, title: faker.book.title(), body: faker.company.catchPhrase() }

      const responseBody = await test.step('Create new post', async () => {
        return await (await routes.posts.createNewPost(requestData)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.SINGLE_POST))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(requestData)
      })
    })

    test(`Should fully update post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const requestData = testData.generate.getPost()

      const responseBody = await test.step(`Fully update post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, async () => {
        return await (await routes.posts.fullUpdatePost(APP_CONFIG.POSTS.POSTS.ID_1, requestData)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.SINGLE_POST))
      })
      await test.step('Validate response content matches fixture', async () => {
        requestData.id = APP_CONFIG.POSTS.POSTS.ID_1
        expect(responseBody).toEqual(requestData)
      })
    })

    test(`Should partially update post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const requestData = { title: faker.lorem.sentence() }
      const responseData = { ...testData.static(APP_CONFIG.POSTS.FIXTURES.POST_1), ...requestData }

      const responseBody = await test.step(`Partially update post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, async () => {
        return await (await routes.posts.partUpdatePost(APP_CONFIG.POSTS.POSTS.ID_1, requestData)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.SINGLE_POST))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(responseData)
      })
    })

    // NOTE: fake api does not actually delete entities
    test(`Should delete post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, { tag: ['@docs'] }, async ({ routes, testData }) => {
      const responseBody = await test.step(`Delete post with id ${APP_CONFIG.POSTS.POSTS.ID_1}`, async () => {
        return await (await routes.posts.deletePost(APP_CONFIG.POSTS.POSTS.ID_1)).json()
      })
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.EMPTY))
      })
    })

    test(
      `Should return a list of posts for existing user with id ${APP_CONFIG.USERS.USERS.ID_1}`,
      { tag: ['@docs'] },
      async ({ routes, testData }) => {
        const userId = APP_CONFIG.USERS.USERS.ID_1

        const responseBody = await test.step(`Get all posts for user with id ${userId}`, async () => {
          return await (await routes.posts.getAllPostsByUser(userId)).json()
        })
        await test.step('Validate response schema', async () => {
          expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.LIST))
        })
        await test.step('Validate post count', async () => {
          expect(responseBody).toHaveLength(APP_CONFIG.POSTS.POSTS.COUNT_PER_USER)
        })
        await test.step(`Validate all posts belong to user with id ${userId}`, async () => {
          responseBody.forEach(post => {
            expect(post.userId).toBe(userId)
          })
        })
      }
    )
  })

  test.describe('Negative Scenarios', () => {
    test(
      `Should return ${HTTP_STATUS.NOT_FOUND} for a non-existent post with id ${APP_CONFIG.POSTS.POSTS.NON_EXISTENT_ID}`,
      { tag: ['@docs'] },
      async ({ routes, testData }) => {
        const postId = APP_CONFIG.POSTS.POSTS.NON_EXISTENT_ID

        const responseBody = await test.step(`Get post with id ${postId}`, async () => {
          return await (await routes.posts.getPost(postId, false)).json()
        })
        await test.step('Validate response schema', async () => {
          expect(responseBody).toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.EMPTY))
        })
      }
    )

    // NOTE: in a real world scenarios, endpoints should validate/sanitize such requests and throw HTTP 400
    test(`Should return ${HTTP_STATUS.INTERNAL_SERVER_ERROR} for a malformed JSON payload`, { tag: ['@docs'] }, async ({ routes }) => {
      const requestData = `{"title": "test"`
      const method = 'POST'
      const url = APP_CONFIG.USERS.ENDPOINTS.LIST_USERS

      await test.step('Create new post with malformed JSON', async () => {
        await routes.posts.sendAndVerify(
          method,
          url,
          { data: requestData, headers: { 'Content-Type': 'application/json' } },
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          []
        )
      })
    })

    test(
      `Should return ${HTTP_STATUS.OK} and empty list of posts for non-existing user with id ${APP_CONFIG.USERS.USERS.NON_EXISTENT_ID} `,
      { tag: ['@docs'] },
      async ({ routes }) => {
        const userId = APP_CONFIG.USERS.USERS.NON_EXISTENT_ID
        const postsCount = 0

        const responseBody = await test.step(`Get all posts for user with id ${userId}`, async () => {
          return await (await routes.posts.getAllPostsByUser(userId)).json()
        })
        await test.step('Validate post count', async () => {
          expect(responseBody).toHaveLength(postsCount)
        })
      }
    )
  })

  test.describe('Edge Cases', () => {
    // NOTE: in a real world scenarios, endpoints should have mandatory fields to accept, do validations and throw HTTP 400
    test(
      `Should create a post with id ${APP_CONFIG.POSTS.POSTS.ID_101} with empty body`,
      { tag: ['@docs'] },
      async ({ routes, testData }) => {
        const requestData = testData.static(APP_CONFIG.POSTS.FIXTURES.EMPTY)

        const responseBody = await test.step('Create new post', async () => {
          return await (await routes.posts.createNewPost(requestData)).json()
        })
        await test.step('Verify response schema is not empty and is not for a full single post', async () => {
          expect(responseBody).not.toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.EMPTY))
          expect(responseBody).not.toBeValidSchema(testData.schema(APP_CONFIG.POSTS.SCHEMAS.SINGLE_POST))
        })
        await test.step('Validate response body content', async () => {
          expect(responseBody).toEqual(testData.static(APP_CONFIG.POSTS.FIXTURES.POST_101_ID))
        })
      }
    )
  })
})

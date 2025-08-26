import { test as baseTest, expect as baseExpect } from '@playwright/test'
import { RoutePosts } from '../../routes/posts.js'
import { RouteUsers } from '../../routes/users.js'
import { TestDataGenerator } from '../../support/data-generation.js'
import { getFixture, getSchema } from '../../support/data-utils.js'

export const test = baseTest.extend({
  routes: async ({ request }, use) => {
    const routeFixtures = { posts: new RoutePosts(request), users: new RouteUsers(request) }
    await use(routeFixtures)
  },

  testData: [
    async ({}, use) => {
      const dataFixtures = { generate: new TestDataGenerator(), static: getFixture, schema: getSchema }
      await use(dataFixtures)
    },
    { box: true }
  ]
})

export { expect } from '../../support/matchers.js'

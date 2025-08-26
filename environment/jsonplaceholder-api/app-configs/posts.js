export const POSTS_CONST = {
  ENDPOINTS: { LIST_POSTS: '/posts', SINGLE_POST: id => `/posts/${id}` },
  FIXTURES: { POST_1: 'posts/post_1', POST_101: 'posts/post_101', POST_101_ID: 'posts/post_101_id', EMPTY: 'empty' },
  SCHEMAS: { LIST: 'posts/list', SINGLE_POST: 'posts/post', EMPTY: 'empty' },
  POSTS: { COUNT: 100, COUNT_PER_USER: 10, ID_1: 1, ID_101: 101, NON_EXISTENT_ID: 9999 }
}

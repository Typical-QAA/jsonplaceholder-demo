export const USERS_CONST = {
  ENDPOINTS: { LIST_USERS: '/users', SINGLE_USER: id => `/users/${id}` },
  FIXTURES: { USER_1: 'users/user_1', USER_11: 'users/user_11', USER_11_ID: 'users/user_11_id', EMPTY: 'empty' },
  SCHEMAS: { LIST: 'users/list', SINGLE_USER: 'users/user', EMPTY: 'empty' },
  USERS: { COUNT: 10, ID_1: 1, ID_11: 11, NON_EXISTENT_ID: 99 }
}

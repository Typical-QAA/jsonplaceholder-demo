<!-- markdownlint-disable MD026 MD024 MD013 -->

# Test Cases for Users API (`/users`)

**General Precondition**: The API service is running and accessible

## Positive Scenarios

### Test Case: Retrieve All Users

**Description:** Verify that the `GET` request to the `/users` endpoint returns a complete list of 10 users with a `200 OK` status code

**Steps**:

- Send a GET request to `/users`
- Check the response status code
- Validate that the response body contains a list of 10 users
- Verify that each item in the list conforms to the user schema

**Expected Result:** A `200 OK` status code is returned, and the response body is an array of 10 users, each validating against the defined user schema

### Test Case: Retrieve a Specific User

**Description:** Verify that the `GET` request for a valid user ID returns a single user with a `200 OK` status code

**Precondition:** An existing user with a known ID (e.g., `ID 1`)

**Steps:**

- Send a `GET` request to `/users/1`
- Check the response status code
- Validate that the response body contains a single user object that matches the user schema
- Verify the content of the user matches the expected fixture data

**Expected Result:** A `200 OK` status code is returned, and the response body is a single user object matching the schema and fixture data

### Test Case: Create a New User

**Description:** Verify that a `POST` request with a valid payload to `/users` creates a new post and returns a `201 Created` status code and the echoed payload in the response body

**Steps:**

- Generate a new user payload with all user object fields
- Send a `POST` request to `/users` with the generated payload
- Check the response status code
- Validate that the response body contains an object that matches the user schema
- Verify the response body content matches the request payload

**Expected Result:** A `201 Created` status code is returned, and the response body is an object that echoes the request payload and conforms to the user schema

### Test Case: Fully Update an Existing User

**Description:** Verify that a `PUT` request with a valid payload to `/users/1` updates a user and returns a `200 OK` status code and the echoed payload in the response body

**Precondition:** An existing user with a known ID (e.g., `ID 1`)

**Steps:**

- Generate a new user payload with all user object fields
- Send a PUT request to `/users/1` with the generated payload
- Check the response status code
- Validate that the response body contains an object that matches the user schema
- Verify the response body content matches the request payload

**Expected Result:** A `200 OK` status code is returned, and the response body is an object that echoes the request payload and conforms to the user schema

### Test Case: Partially Update an Existing User

**Description:** Verify that a `PATCH` request with a partial payload to `/users/1` updates a user and returns a `200 OK` status code

**Precondition:** An existing user with a known ID (e.g., `ID 1`)

**Steps:**

- Generate a partial payload (e.g., only with email and username fields)
- Send a `PATCH` request to `/users/1` with the partial payload
- Check the response status code
- Validate that the response body contains an object that matches the user schema
- Verify updated fields (email and username) in the response body matches the value from the payload

**Expected Result:** A `200 OK` status code is returned, and the response body is an object with the patched field updated and conforms to the user schema

### Test Case: Delete a User

**Description:** Verify that a `DELETE` request to `/users/1` returns a `200 OK` status code

**Precondition:** An existing user with a known ID (e.g., `ID 1`)

**Steps:**

- Send a `DELETE` request to `/users/1`
- Check the response status code

**Expected Result:** A `200 OK` status code is returned, and the response body is empty

## Negative Scenarios

### Test Case: Retrieve a Non-Existent User

**Description:** Verify that a `GET` request for a user with a non-existent ID (e.g., `ID 99`) returns a `404 Not Found` status code

**Precondition:** An ID of a non-existing user (e.g., `ID 99`)

**Steps:**

- Send a `GET` request to `/users/99`
- Check the response status code

**Expected Result:** A `404 Not Found` status code is returned

### Test Case: Create a User with a Malformed Body

**Description:** Verify that a `POST` request with a malformed JSON payload returns a `500 Internal Server Error` status code

**Steps:**

- Create a malformed JSON string (e.g., `{"name": "test"` )
- Send a `POST` request to `/users` with the malformed string in the body
- Check the response status code

**Expected Result:** A `500 Internal Server Error` status code is returned

## Edge Cases

### Test Case: Create a User with an Empty Payload

**Description:** Verify that a `POST` request to `/users` with an empty payload returns a `201 Created` status code

**Steps:**

- Create an empty JSON object `{}`
- Send a `POST` request to `/users` with the empty object in the body
- Check the response status code
- Validate the response body to ensure it is not a complete user object

**Expected Result:** A `201 Created` status code is returned, and the response body is a non-empty user object with some default values assigned

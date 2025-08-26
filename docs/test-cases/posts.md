<!-- markdownlint-disable MD026 MD024 MD013 -->

# Test Cases for Posts API (`/posts`)

**General Precondition**: The API service is running and accessible

## Positive Scenarios

### Test Case: Retrieve All Posts

**Description:** Verify that the `GET` request to the `/posts` endpoint returns a complete list of 100 posts with a `200 OK` status code

**Steps**:

- Send a GET request to `/posts`
- Check the response status code
- Validate that the response body contains a list of 100 posts
- Verify that each item in the list conforms to the post schema

**Expected Result:** A `200 OK` status code is returned, and the response body is an array of 100 posts, each validating against the defined post schema

### Test Case: Retrieve a Specific Post

**Description:** Verify that the `GET` request for a valid post ID returns a single post with a `200 OK` status code

**Precondition:** An existing post with a known ID (e.g., `ID 1`)

**Steps:**

- Send a `GET` request to `/posts/1`
- Check the response status code
- Validate that the response body contains a single post object that matches the post schema
- Verify the content of the post matches the expected fixture data

**Expected Result:** A `200 OK` status code is returned, and the response body is a single post object matching the schema and fixture data

### Test Case: Create a New Post

**Description:** Verify that a `POST` request with a valid payload to `/posts` creates a new post and returns a `201 Created` status code and the echoed payload in the response body

**Steps:**

- Generate a new post payload with `userId`, `title`, and `body` fields
- Send a `POST` request to `/posts` with the generated payload
- Check the response status code
- Validate that the response body contains an object that matches the post schema
- Verify the response body content matches the request payload

**Expected Result:** A `201 Created` status code is returned, and the response body is an object that echoes the request payload and conforms to the post schema

### Test Case: Fully Update an Existing Post

**Description:** Verify that a `PUT` request with a valid payload to `/posts/1` updates a post and returns a `200 OK` status code and the echoed payload in the response body

**Precondition:** An existing post with a known ID (e.g., `ID 1`)

**Steps:**

- Generate a new post payload with `userId`, title, and body fields
- Send a PUT request to `/posts/1` with the generated payload
- Check the response status code
- Validate that the response body contains an object that matches the post schema
- Verify the response body content matches the request payload

**Expected Result:** A `200 OK` status code is returned, and the response body is an object that echoes the request payload and conforms to the post schema

### Test Case: Partially Update an Existing Post

**Description:** Verify that a `PATCH` request with a partial payload to `/posts/1` updates a post and returns a `200 OK` status code

**Precondition:** An existing post with a known ID (e.g., `ID 1`)

**Steps:**

- Generate a partial payload (e.g., only with the title field)
- Send a `PATCH` request to `/posts/1` with the partial payload
- Check the response status code
- Validate that the response body contains an object that matches the post schema
- Verify the updated field (title) in the response body matches the value from the payload

**Expected Result:** A `200 OK` status code is returned, and the response body is an object with the patched field updated and conforms to the post schema

### Test Case: Delete a Post

**Description:** Verify that a `DELETE` request to `/posts/1` returns a `200 OK` status code

**Precondition:** An existing post with a known ID (e.g., `ID 1`)

**Steps:**

- Send a `DELETE` request to `/posts/1`
- Check the response status code

**Expected Result:** A `200 OK` status code is returned, and the response body is empty

### Test Case: Retrieve Posts by a Valid User ID

**Description:** Verify that a `GET` request to `/posts?userId=1` returns a `200 OK` status code with an empty list

**Precondition:** An existing user with a known ID (e.g., `ID 1`) that have existing posts

**Steps:**

- Send a `GET` request to `/posts?userId=1`
- Check the response status code
- Validate that the response body is an empty array

**Expected Result:** A `200 OK` status code is returned, and the response body is an array of 10 posts, each validating against the defined post schema and belongs to a user with `ID 1`

## Negative Scenarios

### Test Case: Retrieve a Non-Existent Post

**Description:** Verify that a `GET` request for a post with a non-existent ID (e.g., `ID 9999`) returns a `404 Not Found` status code

**Precondition:** An ID of a non-existing post (e.g., `ID 9999`)

**Steps:**

- Send a `GET` request to `/posts/9999`
- Check the response status code

**Expected Result:** A `404 Not Found` status code is returned

### Test Case: Create a Post with a Malformed Body

**Description:** Verify that a `POST` request with a malformed JSON payload returns a `500 Internal Server Error` status code

**Steps:**

- Create a malformed JSON string (e.g., `{"title": "test"` )
- Send a `POST` request to `/posts` with the malformed string in the body
- Check the response status code

**Expected Result:** A `500 Internal Server Error` status code is returned

### Test Case: Retrieve Posts by an Invalid User ID

**Description:** Verify that a `GET` request to `/posts?userId=99` returns a `200 OK` status code with an empty list

**Precondition:** An ID of a non-existing user (e.g., `ID 99`)

**Steps:**

- Send a `GET` request to `/posts?userId=99`
- Check the response status code
- Validate that the response body is an empty array

**Expected Result:** A `200 OK` status code is returned, and the response body is an empty array `[]`

## Edge Cases

### Test Case: Create a Post with an Empty Payload

**Description:** Verify that a `POST` request to `/posts` with an empty payload returns a `201 Created` status code

**Steps:**

- Create an empty JSON object `{}`
- Send a `POST` request to `/posts` with the empty object in the body
- Check the response status code
- Validate the response body to ensure it is not a complete post object

**Expected Result:** A `201 Created` status code is returned, and the response body is a non-empty post object with some default values assigned

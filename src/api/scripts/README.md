# Gestão de Condominios

> API para gestão de condomínios

## Base URL

```
http://localhost:8080
```

## Authentication

<details>
  <summary>
    <code>POST</code> <code><b>/auth</b></code> (Authenticate and return a JWT token)
  </summary>

**Description:** This endpoint authenticates a user and returns a token.

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `401` | Unauthorized |

</details>

## Users

<details>
  <summary>
    <code>POST</code> <code><b>/users</b></code> (Create a user)
  </summary>

**Description:** This endpoint creates a new user.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/users</b></code> (Retrieve all users)
  </summary>

**Description:** This endpoint returns a list of all users.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/users/{id}</b></code> (Retrieve a user by ID)
  </summary>

**Description:** This endpoint returns a user by their ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/users/{id}</b></code> (Update a user)
  </summary>

**Description:** This endpoint updates an existing user.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/users/{id}</b></code> (Delete a user)
  </summary>

**Description:** This endpoint deletes a user by their ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>POST</code> <code><b>/users/forgot-password</b></code> (Initiate password recovery)
  </summary>

**Description:** This endpoint sends an email to the user who forgot their password containing an OTP code.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>POST</code> <code><b>/users/forgot-password/validate-otp</b></code> (Validate OTP code)
  </summary>

**Description:** This endpoint validates the OTP code that was sent to the user by email.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `400` | Bad Request |

</details>

<details>
  <summary>
    <code>POST</code> <code><b>/users/reset-password</b></code> (Reset user password)
  </summary>

**Description:** This endpoint resets the user\'s password in the database.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `default` |  |

</details>


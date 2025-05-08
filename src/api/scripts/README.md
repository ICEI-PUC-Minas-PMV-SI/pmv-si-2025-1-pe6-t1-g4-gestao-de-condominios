# Gestão de Condominios

> API para gestão de condomínios

## Base URL

```
http://localhost:8080
```

## Apartments

<details>
  <summary>
    <code>POST</code> <code><b>/apartments</b></code> (Register an apartments)
  </summary>

**Description:** This endpoint registers an apartment.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/apartments</b></code> (Retrieve all apartments)
  </summary>

**Description:** This endpoint returns a list of all apartments.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/apartments/{id}</b></code> (Retrieve an apartment by ID)
  </summary>

**Description:** This endpoint returns an apartment by ID.

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
    <code>PUT</code> <code><b>/apartments/{id}</b></code> (Update an apartment)
  </summary>

**Description:** This endpoint updates an existing apartment.

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
    <code>DELETE</code> <code><b>/apartments/{id}</b></code> (Delete an apartment)
  </summary>

**Description:** This endpoint deletes an apartment by ID.

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
    <code>POST</code> <code><b>/apartments/{id}/assign-user</b></code> (Assign an user to an apartment)
  </summary>

**Description:** This endpoint assigns a user to an apartment.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/apartments/{id}/unassign-user/{userId}</b></code> (Unassign an user to an apartment)
  </summary>

**Description:** This endpoint unassigns a user to an apartment.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |
| `userId` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

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

## Common Areas

<details>
  <summary>
    <code>POST</code> <code><b>/common-areas</b></code> (Register a common area)
  </summary>

**Description:** This endpoint registers a common area.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/common-areas</b></code> (Retrieve all common areas)
  </summary>

**Description:** This endpoint returns a list of all common areas.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/common-areas/{id}</b></code> (Retrieve a common area)
  </summary>

**Description:** This endpoint returns a common area.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/common-areas/{id}</b></code> (Update a common area)
  </summary>

**Description:** This endpoint updates a common area.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/common-areas/{id}</b></code> (Delete a common area)
  </summary>

**Description:** This endpoint deletes a common area.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |

</details>

## Condominiums

<details>
  <summary>
    <code>POST</code> <code><b>/condominiums</b></code> (Register a condominium)
  </summary>

**Description:** This endpoint registers a condominium.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/condominiums</b></code> (Retrieve all condominiums)
  </summary>

**Description:** This endpoint returns a list of all condominiums.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/condominiums/{id}</b></code> (Retrieve a condominium)
  </summary>

**Description:** This endpoint returns a condominium.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/condominiums/{id}</b></code> (Update a condominium)
  </summary>

**Description:** This endpoint updates a condominium.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/condominiums/{id}</b></code> (Delete a condominium)
  </summary>

**Description:** This endpoint deletes a condominium.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |

</details>

## Fees

<details>
  <summary>
    <code>POST</code> <code><b>/fees</b></code> (Create a fee)
  </summary>

**Description:** This endpoint creates a new fee.

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "type": "RENT|CONDOMINIUM|OTHER",
  "name": "Fee Name",
  "due": "2020-01-01T00:00:00.000Z",
  "isRecurrent": true,
  "condominiumId": "1234567890abcdef"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/fees</b></code> (Retrieve all fees)
  </summary>

**Description:** This endpoint returns a list of all fees.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/fees/{id}</b></code> (Retrieve a fee by ID)
  </summary>

**Description:** This endpoint returns a fee by its ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/fees/{id}</b></code> (Update a fee)
  </summary>

**Description:** This endpoint updates an existing fee.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "type": "RENT|CONDOMINIUM|OTHER",
  "name": "Fee Name",
  "due": "2020-01-01T00:00:00.000Z",
  "isRecurrent": true,
  "condominiumId": "1234567890abcdef"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/fees/{id}</b></code> (Delete a fee)
  </summary>

**Description:** This endpoint deletes a fee by their ID.

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

## Other

<details>
  <summary>
    <code>POST</code> <code><b>/notice-managements</b></code>
  </summary>

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/notice-managements</b></code>
  </summary>

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/notice-managements/{id}</b></code>
  </summary>

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/notice-managements/{id}</b></code>
  </summary>

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/notice-managements/{id}</b></code>
  </summary>

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |

</details>

## Payments

<details>
  <summary>
    <code>POST</code> <code><b>/payments</b></code> (Create a Payment)
  </summary>

**Description:** This endpoint creates a new Payment.

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "amount": 20,
  "paymentDate": "2020-01-01T00:00:00.000Z",
  "feeId": "1234567890abcdef",
  "condominiumId": "1234567890abcdef",
  "userId": "1234567890abcdef",
  "apartmentId": "1234567890abcdef"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/payments</b></code> (Retrieve all Payments)
  </summary>

**Description:** This endpoint returns a list of all Payments.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/payments/{id}</b></code> (Retrieve a Payment by ID)
  </summary>

**Description:** This endpoint returns a Payment by its ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/payments/{id}</b></code> (Update a Payment)
  </summary>

**Description:** This endpoint updates an existing Payment.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "amount": 20,
  "paymentDate": "2020-01-01T00:00:00.000Z",
  "feeId": "1234567890abcdef",
  "condominiumId": "1234567890abcdef",
  "userId": "1234567890abcdef",
  "apartmentId": "1234567890abcdef"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/payments/{id}</b></code> (Delete a Payment)
  </summary>

**Description:** This endpoint deletes a Payment by their ID.

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

## Users

<details>
  <summary>
    <code>POST</code> <code><b>/users</b></code> (Create a user)
  </summary>

**Description:** This endpoint creates a new user.

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "profile": "ADMIN|MANAGER|RESIDENT",
  "phone": "31999999999",
  "birthDate": "12/12/2012"
}
```

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

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "profile": "ADMIN|MANAGER|RESIDENT",
  "phone": "31999999999",
  "birthDate": "12/12/2012"
}
```

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
| `204` | No Content |
| `400` | Bad Request |

</details>


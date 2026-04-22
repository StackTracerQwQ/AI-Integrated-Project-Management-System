# API Documentation

Base URL: `/api/v1`

All authenticated endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Users](#2-users)
3. [Projects](#3-projects)
4. [Statuses](#4-statuses)
5. [Utilities](#5-utilities)

---

## 1. Authentication

### POST `/login/access-token`
OAuth2 login — returns a JWT access token.

**Auth**: None

**Request** (form data):
| Field | Type | Required |
|-------|------|----------|
| username | string (email) | Yes |
| password | string | Yes |

**Response** `200`:
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

---

### POST `/login/test-token`
Validates the current Bearer token and returns the authenticated user.

**Auth**: Bearer token required

**Request**: None

**Response** `200` — `UserPublic`:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "is_active": true,
  "is_superuser": false,
  "full_name": "string | null",
  "employee_id": "uuid | null",
  "created_at": "datetime | null"
}
```

---

### POST `/password-recovery/{email}`
Sends a password reset email if the address is registered.

**Auth**: None

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| email | string | Yes |

**Response** `200`:
```json
{
  "message": "If that email is registered, we sent a password recovery link"
}
```

---

### POST `/reset-password/`
Resets the user's password using a valid reset token.

**Auth**: None

**Request Body** — `NewPassword`:
| Field | Type | Constraints | Required |
|-------|------|-------------|----------|
| token | string | — | Yes |
| new_password | string | min 8, max 128 chars | Yes |

**Response** `200`:
```json
{
  "message": "Password updated successfully"
}
```

---

### POST `/password-recovery-html-content/{email}`
Returns the HTML email content for a password recovery email (admin preview).

**Auth**: Superuser required

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| email | string | Yes |

**Response** `200`: HTML content (HTMLResponse)

---

## 2. Users

### GET `/users/`
Retrieve a paginated list of all users.

**Auth**: Superuser required

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| skip | integer | 0 | Records to skip |
| limit | integer | 100 | Max records to return |

**Response** `200` — `UsersPublic`:
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "is_active": true,
      "is_superuser": false,
      "full_name": "string | null",
      "employee_id": "uuid | null",
      "created_at": "datetime | null"
    }
  ],
  "count": 0
}
```

---

### GET `/users/all-users`
Retrieve all users with their associated role details.

**Auth**: Superuser required

**Response** `200` — `UsersDetail`:
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "string | null",
      "role": "string | null"
    }
  ],
  "count": 0
}
```

---

### POST `/users/`
Create a new user account.

**Auth**: Superuser required

**Request Body** — `AdminUserCreate`:
| Field | Type | Constraints | Required |
|-------|------|-------------|----------|
| email | string (email) | max 255 chars | Yes |
| password | string | min 8, max 128 chars | Yes |
| role_name | string \| null | max 100 chars | No |

**Response** `200` — `UserPublic`:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "is_active": true,
  "is_superuser": false,
  "full_name": "string | null",
  "employee_id": "uuid | null",
  "created_at": "datetime | null"
}
```

---

### GET `/users/me`
Get the currently authenticated user's profile.

**Auth**: Bearer token required

**Response** `200` — `UserProfile`:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "is_superuser": false,
  "first_name": "string | null",
  "last_name": "string | null",
  "full_name": "string | null",
  "role_name": "string | null",
  "is_active": true
}
```

---

### PATCH `/users/me`
Update the currently authenticated user's own profile.

**Auth**: Bearer token required

**Request Body** — `UserUpdateMe`:
| Field | Type | Constraints | Required |
|-------|------|-------------|----------|
| full_name | string \| null | max 255 chars | No |
| email | string (email) \| null | max 255 chars | No |

**Response** `200` — `UserPublic` (see above)

---

### PATCH `/users/me/password`
Update the currently authenticated user's password.

**Auth**: Bearer token required

**Request Body** — `UpdatePassword`:
| Field | Type | Constraints | Required |
|-------|------|-------------|----------|
| current_password | string | min 8, max 128 chars | Yes |
| new_password | string | min 8, max 128 chars | Yes |

**Response** `200`:
```json
{
  "message": "Password updated successfully"
}
```

---

### GET `/users/{user_id}`
Get a specific user by ID. Non-superusers can only retrieve their own record.

**Auth**: Bearer token required (superuser required to view other users)

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| user_id | UUID | Yes |

**Response** `200` — `UserPublic` (see above)

---

### PATCH `/users/{user_id}`
Update any user's details.

**Auth**: Superuser required

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| user_id | UUID | Yes |

**Request Body** — `UserUpdate`:
| Field | Type | Constraints | Required |
|-------|------|-------------|----------|
| email | string (email) \| null | max 255 chars | No |
| is_active | boolean \| null | — | No |
| is_superuser | boolean \| null | — | No |
| full_name | string \| null | max 255 chars | No |
| password | string \| null | min 8, max 128 chars | No |
| role_name | string \| null | max 100 chars | No |

**Response** `200` — `UserPublic` (see above)

---

### DELETE `/users/{user_id}`
Delete a user. Superusers cannot delete their own account.

**Auth**: Superuser required

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| user_id | UUID | Yes |

**Response** `200`:
```json
{
  "message": "User deleted successfully"
}
```

---

## 3. Projects

### POST `/projects`
Create a new project.

**Auth**: Bearer token required

**Request Body** — `ProjectCreateRequest`:
| Field | Type | Constraints | Required |
|-------|------|-------------|----------|
| job_number | string | — | Yes |
| project_types | string | default: `"civil"` | No |
| project_name | string | — | Yes |
| client_name | string | — | Yes |
| client_company | string \| null | — | No |
| client_contact | string \| null | — | No |
| client_address | string \| null | — | No |
| fee_estimate | decimal \| null | max 10 digits, 2 decimal places | No |
| date_received | date | — | Yes |
| start_date | date | — | Yes |
| due_date | date | — | Yes |

**Response** `200` — `ProjectCreateResponse`:
```json
{
  "project_id": "uuid",
  "message": "project created successfully"
}
```

---

### GET `/projects`
Get all projects, optionally filtered by status.

**Auth**: None

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string \| null | No | Filter by project status |

**Response** `200` — `ProjectDetailsResponse`:
```json
{
  "data": [
    {
      "project_id": "uuid",
      "job_number": "string",
      "project_name": "string | null",
      "company_name": "string | null",
      "company_address": "string | null",
      "client_name": "string | null",
      "status": "string | null",
      "start_date": "date | null",
      "due_date": "date | null",
      "days_elapsed": "integer | null",
      "fee_estimate": "decimal | null"
    }
  ],
  "count": 0
}
```

---

### GET `/projects/all-project`
Get a summary list of all active projects.

**Auth**: Superuser required

**Response** `200` — `ProjectsListResponse`:
```json
{
  "data": [
    {
      "project_id": "uuid",
      "project_name": "string | null",
      "client_name": "string | null",
      "project_manager_name": "string | null",
      "days_since_started": "integer | null"
    }
  ],
  "count": 0
}
```

---

### GET `/projects/delay-project`
Get all projects that are delayed.

**Auth**: Superuser required

**Response** `200` — `ProjectsListResponse` (same shape as `/projects/all-project`)

---

### GET `/projects/current-project-num`
Get the count of active projects for the current month vs the previous month.

**Auth**: Superuser required

**Response** `200` — `MonthlyCountResponse`:
```json
{
  "current_month": 0,
  "previous_month": 0
}
```

---

### GET `/projects/completed-project`
Get the count of completed projects for the current month vs the previous month.

**Auth**: Superuser required

**Response** `200` — `MonthlyCountResponse`:
```json
{
  "current_month": 0,
  "previous_month": 0
}
```

---

### GET `/projects/invoice-bill`
Get the total invoice amounts for the current month vs the previous month.

**Auth**: Superuser required

**Response** `200` — `MonthlyInvoiceResponse`:
```json
{
  "current_month_total": "decimal",
  "previous_month_total": "decimal"
}
```

---

### GET `/projects/{project_id}`
Get full details of a specific project.

**Auth**: None

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| project_id | UUID | Yes |

**Response** `200` — `ProjectDetail`:
```json
{
  "project_id": "uuid",
  "job_number": "string",
  "project_name": "string | null",
  "company_name": "string | null",
  "company_address": "string | null",
  "client_name": "string | null",
  "status": "string | null",
  "start_date": "date | null",
  "due_date": "date | null",
  "days_elapsed": "integer | null",
  "fee_estimate": "decimal | null"
}
```

---

### PATCH `/projects/{project_id}`
Update a project's details.

**Auth**: None

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| project_id | UUID | Yes |

**Request Body** — `ProjectUpdateRequest`:
| Field | Type | Required |
|-------|------|----------|
| project_name | string \| null | No |
| project_types | string \| null | No |
| status | string \| null | No |
| date_received | date \| null | No |
| start_date | date \| null | No |
| due_date | date \| null | No |
| fee_estimate | decimal \| null | No |

**Response** `200`:
```json
{
  "message": "Project updated successfully"
}
```

---

### DELETE `/projects/{project_id}`
Delete a specific project by ID.

**Auth**: None

**Path Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| project_id | UUID | Yes |

**Response** `200`:
```json
{
  "message": "Project deleted successfully"
}
```

---

### DELETE `/projects`
Delete all projects.

**Auth**: None

**Response** `200`:
```json
{
  "message": "Deleted X projects successfully"
}
```

---

## 4. Statuses

### GET `/statuses`
Get all available project status values.

**Auth**: None

**Response** `200`:
```json
["active", "completed", "on_hold", "..."]
```

---

## 5. Utilities

### GET `/utils/health-check/`
Simple health check to confirm the API is running.

**Auth**: None

**Response** `200`:
```json
true
```

---

### POST `/utils/test-email/`
Send a test email to a specified address.

**Auth**: Superuser required

**Query Parameters**:
| Parameter | Type | Required |
|-----------|------|----------|
| email_to | string (email) | Yes |

**Response** `201`:
```json
{
  "message": "Test email sent"
}
```

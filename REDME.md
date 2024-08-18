# My Salary API Documentation

## Overview

#### **This API lets you manage users, cash flows, and other resources in the app. You can create, update, and get user profiles and cash flow details. Most endpoints need authentication, except for login and registration, which don’t require it.**

**Base URL:**

```
http://localhost:3001
```

##

## Instalation and start

> Dont forgot about [.env](https://github.com/HolikovOleksandr/my_salary_api/blob/main/.env.example) file!

###

**Clone and enter inside the repository :**

```
git clone https://github.com/HolikovOleksandr/my_salary_api.git

cd my_salary_api
```

###

**Install dependency and run server:**

```
npm install

npm start
```

##

## Authentication

**Description:**  
 All endpoints require authentication to ensure that only authorized users can access the API. Authentication is managed using a Bearer token included in the Authorization header. The token also contains role information that determines the user's access level.

**Auth Method:** Bearer Token

**Header:** Authorization: Bearer {token}

**Token Payload:**  
| Field | Description |
| -------- | ------------------------------------------------------------------------------|
| `id` | The unique identifier for the user |
| `email` | The email address of the user |
| `role` | The role assigned to the user, which defines their permissions within the API |
| `iat` | The issued-at time of the token (timestamp) |
| `exp` | The expiration time of the token (timestamp) |

##

## Users Module

**Description:**  
The Users Module is a fundamental component of the application that provides CRUD (Create, Read, Update, Delete) functionality for managing user accounts, along with authentication features such as user registration and login. This module enables administrators and authenticated users to perform various operations on user data, ensuring that access is controlled through specific middleware to maintain security and proper authorization.

| HTTP Method | Endpoint        | Description         | Middleware(s)                                                                                                                                                                                                                                  |
| ----------- | --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`       | `/users`        | Get all users       | -                                                                                                                                                                                                                                              |
| `GET`       | `/users/:id`    | Get user by ID      | -                                                                                                                                                                                                                                              |
| `POST`      | `/users`        | Create new user     | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js), [`adminAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/adminAccess.js)                 |
| `POST`      | `/users/signup` | Register a new user | -                                                                                                                                                                                                                                              |
| `POST`      | `/users/signin` | User login          | -                                                                                                                                                                                                                                              |
| `PATCH`     | `/users/:id`    | Update user by ID   | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js), [`ownerAndAdminAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/ownerAndAdminAccess.js) |
| `DELETE`    | `/users`        | Delete all users    | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js), [`adminAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/adminAccess.js)                 |
| `DELETE`    | `/users/:id`    | Delete user by ID   | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js), [`ownerAndAdminAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/ownerAndAdminAccess.js) |

##

## Cashflow Module

**Description:**  
The Cashflow Module provides CRUD (Create, Read, Update, Delete) functionality for managing cash flow records in the application. This module ensures that operations on cash flow data are secured and authorized using specific middleware, allowing only authenticated users and those with appropriate permissions to perform actions.

| HTTP Method | Endpoint        | Description                   | Middleware(s)                                                                                                                                                                                                                                  |
| ----------- | --------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`      | `/cashflow`     | Create new cash flow record   | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js), [`ownerAndAdminAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/ownerAndAdminAccess.js) |
| `GET`       | `/cashflow`     | Get all cash flow records     | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js)                                                                                                                              |
| `GET`       | `/cashflow/:id` | Get cash flow record by ID    | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js)                                                                                                                              |
| `PATCH`     | `/cashflow/:id` | Update cash flow record by ID | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js)                                                                                                                              |
| `DELETE`    | `/cashflow`     | Delete all cash flow records  | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js), [`adminAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/adminAccess.js)                 |
| `DELETE`    | `/cashflow/:id` | Delete cash flow record by ID | [`authUserAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/authUserAccess.js), [`ownerAndAdminAccess`](https://github.com/HolikovOleksandr/my_salary_api/blob/main/src/middlewares/ownerAndAdminAccess.js) |

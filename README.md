# Chat Backend App

Chat Backend App is the backend for the end user using the Chat Application.

## Getting Started

#### Here are the major areas of this app :
- **Controllers** - Contains the controller module.
- **Services** - Contains business logic for the API.
- **Routes** - Contains routes for the services.
- **DB** - Contains utilities for database connection and models.
- **Helpers** - Contains helper utility files used across the application.

#### Prerequisites

You need node version 14.16.1. You can use nvm to manage node versions.

#### Get it working
```bash
npm install
```
Install node packages when setting up the app.

Create a new file named .env on local and copy+paste the contents of .env-sample and additionally, fill the MySQL server details for the empty keys.

#### Run Scripts
```bash
node index.js
```
You can access the route from <http://localhost:9090>. It can also be changed by changing .env variable value.

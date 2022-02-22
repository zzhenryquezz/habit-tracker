# Habit tracker

This app was made to show my skills as a web-developer.

## About

This is a multi-tenant habit tracker, each user can create its own **habit** and **habits-sequences** to know how many times they have done the habit and the days he may miss.

## Setup

### 1 - Clone the repository

```
git clone https://github.com/htron-dev/habit-tracker-api.git
```

### 2 - Install the dependencies

```
npm install
```

### 3 Define a .env file with the required variables

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=Ww1cc--6aimw8xg7XabInHqwx_-XG4gw
DRIVE_DISK=local

DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=docker
PG_DB_NAME=habit-tracker

```

> **_Tip_**: You can get a APP_KEY code with the command `node ace generate:key`

### 4 - Start the server:

```
npm run dev
```

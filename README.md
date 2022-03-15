<div align='center'>

# Habit tracker

This app was made to show my skills as a web developer, it's a multi-tenant habit tracker.

builded with: [adonis-v5](https://adonisjs.com/) - [PostgresSQL](https://www.postgresql.org/) - [Swagger-ui](https://swagger.io/).

</div>

## Setup

### 1 - Clone the repository

```
git clone https://github.com/htron-dev/habit-tracker.git
```

### 2 - Install the dependencies

```
npm install
```

### 3 Create a .env file with the required variables

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

### 4 - Start the server

```
npm run dev
```

If everything goes right you can already go to [http://localhost:3333/api/docs](http://localhost:3333/api/docs) and check the documentation and requests of the API.

## Admin user

To create a admin user for the app you just need to execute the following command in the root of project and follow the instructions:

```
 node ace create:user
```

Another way is to create a normal user using the registration request and then use the update request to set the **is_admin** field to **true**, but the logged user must be an admin to do that.

## Tests

Tests are made using [japa](https://japa.dev/), that is a testing library focused in nodejs apps and also was created by the same author of [adonis-v5](https://adonisjs.com/) so they have a very good synergy.

You can run tests with the following command:

```
npm test
```

## About

There are 3 main entities that build the system: **users, habits and habits-sequences**

### Users

The system uses users as the `tenant`, so every user can have its own habits and sequences but they can not see or edit the habits of others users.

Users are also used by the authentication system of [adonis-v5](https://adonisjs.com/) to authenticate the requests.

**Related files:**

- [1645019234385_users.ts](./database/migrations/1645019234385_users.ts)
- [UsersController.ts](./app/Controllers/Http/UsersController.ts)
- [UsersController.int.spec.ts](./test/controllers/UsersController.int.spec.ts)
- [UserStoreValidator.ts](./app/Validators/UserStoreValidator.ts)

### Habits

Every habits is linked to a user by its id and this is used when filtering the correct habits to each user.

**Related files:**

- [1645098780620_habits.ts](./database/migrations/1645098780620_habits.ts)
- [HabitsController.ts](./app/Controllers/Http/HabitsController.ts)
- [HabitsController.int.spec.ts](./test/controllers/HabitsController.int.spec.ts)
- [HabitIndexValidator.ts](./app/Validators/HabitIndexValidator.ts)
- [HabitStoreValidator.ts](./app/Validators/HabitStoreValidator.ts)

### Habits-sequences

Habit sequence is a day that the habit have been executed or not, is linked to a habit by id and just with this the system can know of what user this sequence belongs and who can edit it.

**Related files:**

- [1645101717036_habit_sequences.ts](./database/migrations/1645101717036_habit_sequences.ts)
- [HabitSequencesController.ts](./app/Controllers/Http/HabitSequencesController.ts)
- [HabitSequencesController.int.spec.ts](./test/controllers/HabitSequencesController.int.spec.ts)
- [HabitSequenceIndexValidator.ts](./app/Validators/HabitSequenceIndexValidator.ts)
- [HabitSequenceStoreValidator.ts](./app/Validators/HabitSequenceStoreValidator.ts)
- [HabitSequenceUpdateValidator.ts](./app/Validators/HabitSequenceUpdateValidator.ts)

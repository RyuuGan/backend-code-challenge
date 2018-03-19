# Basic Backend Developer Interview

Dear candidate, please follow this readme and solve all questions.

> Before you can start, you should prepare your development environment.

**This test requires:**
- access to the internet
- your favourite IDE
- (PHP) working dev environment with PHP 7 and symfony 3.x
- (Node) working dev environment with Node.js LTS
- database (MongoDB, Postgres, MySQL)
- nginx or alternative simple dev web server

**Good luck!**


--------


## Test tasks:

**NOTE:** You are free to use any framework you wish. Bonus points for an explanation of your choice.

1. Specify a default controller
  - for route `/`
  - with a proper json return `{"hello":"world!"}`

2. Use the api.nasa.gov
  - the API-KEY is `N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD`
  - documentation: https://api.nasa.gov/api.html#neows-feed

3. Write a command
  - to request the data from the last 3 days from nasa api
  - response contains count of Near-Earth Objects (NEOs)
  - persist the values in your DB
  - Define the model as follows:
    - date
    - reference (neo_reference_id)
    - name
    - speed (kilometers_per_hour)
    - is hazardous (is_potentially_hazardous_asteroid)

4. Create a route `/neo/hazardous`
  - display all DB entries which contain potentially hazardous asteroids
  - format JSON

5. Create a route `/neo/fastest?hazardous=(true|false)`
  - analyze all data
  - calculate and return the model of the fastest asteroid
  - with a hazardous parameter, where `true` means `is hazardous`
  - default hazardous value is `false`
  - format JSON

6. Create a route `/neo/best-year?hazardous=(true|false)`
  - analyze all data
  - calculate and return a year with most asteroids
  - with a hazardous parameter, where `true` means `is hazardous`
  - default hazardous value is `false`
  - format JSON

7. Create a route `/neo/best-month?hazardous=(true|false)`
  - analyze all data
  - calculate and return a month with most asteroids (not a month in a year)
  - with a hazardous parameter, where `true` means `is hazardous`
  - default hazardous value is `false`
  - format JSON

## Additional Instructions

- Fork this repository
- Tests are not optional
- (PHP) Symfony is the expected framework
- After you're done, provide us the link to your repository.
- Leave comments where you were not sure how to properly proceed.
- Implementations without a README will be automatically rejected.

## Bonus Points

- Clean code!
- Knowledge of application flow.
- Knowledge of modern best practices/coding patterns.
- Componential thinking.
- Knowledge of Docker.
- Usage of MongoDB as persistance storage.


---

## Directory structure

* `model` - directory that contains models for mongodb database.
* `routes` - all routes for the application
* `test` - contains tests for the application.
* `test/fixture` - data for tests
* `tools` - contains scripts for application that might be run via cron or just helper scripts to do some work.

## Files structure

* `conf.js` - contains main configuration of application.
* `run.js` - entry point for web-server.
* `app.js` - contains web application based on `express.js`

## Default settings

* MongoDB database name: `mcmakler`.
* Application port: `3001`.
* Host: `127.0.0.1:3001`

## About tests

Tests use fixtures (a data that is used for test). So the response of the server is checked based on the data from
fixture. The separate step is used (with name `fixture/{id}`) to load fixture , where `id` is the directory name of a fixture.

## NPM scripts

There are several npm scripts in the project:

* `start` - starts developing server (by default port is 3001, see `conf.js`). Use `loadNasaData` script to setup data
  for DB.
* `test` - run tests. It uses different MongoDB database, that is set via `cross-env`.
* `loadNasaData` - script that is loads recent data (last 3 days) from NASA.


## Dependencies

If the setup is used for test, then all dependencies have to be installed,
otherwise production dependencies may be installed.


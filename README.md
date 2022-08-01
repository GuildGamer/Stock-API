
## Installation

```bash
$ npm install
```

## Configuring the app
 - rename "example.env" to ".env"

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Postman documentation of the app

[Postman Link](https://documenter.getpostman.com/view/16607098/Uze1viro)

## Using the app

 - use the login details below to sign in to the app
    *     email: testuser@gmail.com
    *     password: testp@$$

 - see postman documentation for details on "Sign In" at Auth > Sign In

 - get the access token

 - use the access token to send a "Get Profit" request

 - see postman documentation for details of the "Get profit" request at Profit > Get Profit

## Errors and Fixes
 - If the app fails to connect to the database server, contact the developer(tobi4steve@gmail.com) to provide the new database url credentials since the heroku database credentials change periodically.
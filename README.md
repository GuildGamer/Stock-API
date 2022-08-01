
## Installation

```bash
$ npm install
```

## Configuring the app
 - rename "example.env" to ".env"
 - uncomment DATABASE_URL and JWT_SECRET
 - save the  changes

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

 - see [postman documentation](https://documenter.getpostman.com/view/16607098/Uze1viro#793804b2-3a64-4038-9dd4-64514850cdd2) for details on "Sign In" at Auth > Sign In

 - get the access token
 
 - Token prefix: Bearer

 - use the access token to send a "Get Profit" request

 - see [postman documentation](https://documenter.getpostman.com/view/16607098/Uze1viro#7dfa9cf7-88b2-426e-b4b9-f888bf135b42) for details of the "Get profit" request at Profit > Get Profit

## Errors and Fixes
 - If the app fails to connect to the database server, contact the developer(tobi4steve@gmail.com) to provide the new database url credentials since the heroku database credentials change periodically.

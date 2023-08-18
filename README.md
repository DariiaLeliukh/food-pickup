# Food Pick-up Ordering
A simple app for food pick up ordering

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.

## Project SET UP
1. Correct the .env file with your local variables. Here is what is set by default:
```
  username: labber
  password: labber
  database: midterm
  ```
2. Install dependencies: npm i
3. Fix to binaries for sass: npm rebuild node-sass
4. Reset database: npm run db:reset
  Check the db folder to see what gets created and seeded in the SDB

## Run the server
Run the server: npm run local
Note: nodemon is used, so you should not have to restart your server
Visit http://localhost:8080/

## Notes
Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
It runs through each of the files, in order, and executes them against the database.
Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to DROP the tables and recreate them.

## Dependencies
Node 10.x or above
NPM 5.x or above
PG 6.x

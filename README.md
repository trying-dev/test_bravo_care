# Test Bravo Care

## information

in test folder will be the set and test connection, also the Models.


# Intro
This will be a timed technical interview. 

You will have approximately 1 hour to answer 

all questions included 

in the Technical Interview Questions PDF. 

You will be inputting your answers in 

server.js 

and in 

/src/App.js


# Running your code
Open a Shell tab and run the following command to start up the client and server

npm start

A "Webview" tab should automatically open up, if it is not already open, which is where you can view your front-end implementations.


# Using Sequelize for Raw Queries
All database tables have already been created and populated for you. You will be responsible for using sequelize to run raw queries against the database to fetch the necessary information.

A database connection has already been established and can be accessed through the Sequelize instance "sequelize" that has already been imported into "server.js"

You can find the API reference for Sequelize for the .query method that you will be using here: https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-query

# Example usage from above link:
const results = await sequelize.query('SELECT...', { type: sequelize.QueryTypes.SELECT }); 



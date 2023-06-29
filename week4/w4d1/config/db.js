require("dotenv").config(); //Load the environment variables from .env file
const { Pool } = require("pg");

// SQL script as a string to create a table
const sqlScript = `
    CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL
    );
`;

//Create a PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Execute the SQL script to create a table called cars
pool
  .query(sqlScript)
  .then(() => {
    console.log("Table created successfully!!!");
  })
  .catch((error) => {
    console.error("Error create table: ", error);
  });

module.exports = pool;

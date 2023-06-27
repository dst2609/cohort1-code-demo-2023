const { Pool } = require("pg");

//SQL script as a string to create a table called users
const sqlScript = `
CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
`;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "registration_login",
});

//Execute the SQL script
pool
  .query(sqlScript)
  .then(() => {
    console.log("Table created successfully");
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });

module.exports = pool;

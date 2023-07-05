//imports
const express = require("express");
const app = express();
const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const routes = require("../routes/authRoutes");

//import supertest
const request = require("supertest");

app.use(express.json());
app.use("/", routes);

//describe is a function provided by Jest to group related test cases together.
describe("Routes testing", () => {
  //beforeAll = Jest hook that runs once before all the test cases.
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash("testpassword", 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      ["Test User", "test@example.com", hashedPassword]
    );
  });

  //afterAll = Jest hook that runs once after all the test cases
  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email = $1", [
      "test@example.com",
    ]);

    //to make sure that the created user is deleted
    await pool.query("DELETE FROM users WHERE email = $1", [
      "john@example.com",
    ]);
    pool.end();
  });

  //it = Jest function that defines an individual test case
  //test for registering a new user
  it("should register a new user", async () => {
    const response = await request(app).post("/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "1234567890",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token"); //pass
    expect(response.body).toHaveProperty("user"); //pass
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.email).toBe("john@example.com");
  });

  //test the login with valid credentials
  it("should login with valid user credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "testpassword",
    });

    //expect the following from the response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.name).toBe("Test User");
    expect(response.body.user.email).toBe("test@example.com");
  });
});

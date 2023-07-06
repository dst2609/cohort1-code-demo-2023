const request = require("supertest");
const express = require("express");
const app = express();
const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const routes = require("../routes/authRoutes");

app.use(express.json()); // Add this line to parse JSON request bodies
app.use("/", routes);

/**
 * describe is a function provided by Jest to group related test cases together.
beforeAll is a Jest hook that runs once before all the test cases. It creates a test user in the database for testing purposes.

afterAll is a Jest hook that runs once after all the test cases. It cleans up the test user from the database and closes the database connection pool.
 */

describe("Routes Testing", () => {
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash("testpassword", 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      ["Test User", "test@example.com", hashedPassword]
    );
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email = $1", [
      "test@example.com",
    ]);
    pool.end();
  });

  /**
   * it is a Jest function that defines an individual test case.
    request(app) sends a POST request to the /register route using the app instance created in app.js.
    .send() sends the request body containing the user information.
    expect is an assertion function provided by Jest to check if the response matches the expected values.
   */

  it("should register a new user", async () => {
    const response = await request(app).post("/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.email).toBe("john@example.com");
  });

  it("should log in with valid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.name).toBe("Test User");
    expect(response.body.user.email).toBe("test@example.com");
  });

  // Rest of the tests...
});

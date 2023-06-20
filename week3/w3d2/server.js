// //comamnds to start: npm run start OR node server.js
// //------ PART 1---------
// //necessary import
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const userRouter = require("./routes/userRoutes");

// //middleware
// app.use(express.json());

// //Initialize the home route for the Node.js application
// //home path
// app.get("/", (request, response) => {
//   response.send("Hello World!!");
// });

// //Initialize path for users with speicif id
// app.get("/products/:id", (request, response) => {
//   response.send("Product ID: " + request.params.id);
// });

// app.use("/users", userRouter);

// //wildcard route - 404 not found
// app.get("*", (request, response) => {
//   response.status(404).send("Error! Page not found");
// });

// //initialize the server
// app.listen(3000, () => {
//   console.log("Server started at port 3000!!");
// });

//------ PART 2 ---------
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
// const userRouter = require("./routes/userRoutes");
const userRouter = require("./routes/userRoutes");

//Middleware
app.use(express.json());

//Enable Cors
app.use(cors());

//Routes
app.use("/", userRouter);

//Start the server
app.listen(port, () => {
  console.log(`SErver is running on port ${port}`);
});

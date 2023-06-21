//necessary imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const carRouter = require("./routes/cars");

//Create an Express application
const app = express();
const PORT = 3000; //specify the port on which the server will listen

//middleware
app.use(cors()); //Enable CORS middleware to handle cross-origing requests/communication
app.use(morgan("dev")); //Use MOrgan middleware with 'dev' for formatting
app.use(express.json()); //parse incoming requests with JSON

//Mount the car router at a url
app.use("/api/cars", carRouter);

//Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is always running on port ${PORT}`);
});

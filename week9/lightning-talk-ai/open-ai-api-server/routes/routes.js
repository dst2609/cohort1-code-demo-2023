const {
  handleGreeting,
  handleChat,
  handleMediaURL,
  handleImage,
} = require("../controllers/controllers");

module.exports = function (app) {
  // GET route
  app.get("/greeting", handleGreeting);

  // POST route for chat requests
  app.post("/chat", handleChat);

  // POST route for image requests on dall-e
  app.post("/image", handleImage);

  //POST route for imaeg requests on pexels api
  app.post("/media-url", handleMediaURL);
};

// const { Configuration, OpenAIApi } = require("openai");
const { apiLimiter } = require("../security/security");
const axios = require("axios");

// Handle GET /greeting route
async function handleGreeting(req, res) {
  res.send("Hello, welcome to the chat API!");
}

// Handle POST /chat route
async function handleChat(req, res) {
  const { message } = req.body;

  try {
    const response = await apiLimiter.post(
      `${process.env.OPEN_AI_POST_URL}`, //"https://api.openai.com/v1/chat/completions"
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ message: reply });
  } catch (error) {
    console.error("OpenAI API request failed:", error.message);
    res.status(500).json({ error: "Failed to process the request" });
  }
}

//Handle POST /image route for URL input
async function handleImage(req, res) {
  const { text } = req.body;
  try {
    const response = await apiLimiter.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: text,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const resUrl = response.data.data[0].url;

    res.status(200).send({
      message: "Image URL received successfully",
      url: resUrl,
    });
  } catch (error) {
    console.error("OpenAI API request failed:", error.message);
    res.status(500).json({ error: "Failed to process the request" });
  }
}

// Handle POST /media-url route for URL input
async function handleMediaURL(req, res) {
  try {
    if (!req.body.text) {
      res.status(400).send({ error: "No text provided" });
      return;
    }

    const { text } = req.body;
    const pexelsApiKey = process.env.PEXELS_API_KEY;

    if (!pexelsApiKey) {
      console.error("No Pexels API key found in environment variables.");
      res.status(500).json({ error: "Server error" });
      return;
    }

    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: { query: text, per_page: 10 }, // Request 10 results per page
      headers: { Authorization: pexelsApiKey },
    });

    // Make sure we have at least one photo
    if (response.data.photos.length === 0) {
      res.status(404).send({ error: "No photos found" });
      return;
    }

    // Generate a random number from 0 to the number of photos received (up to 10)
    const randomIndex = Math.floor(Math.random() * response.data.photos.length);

    // Fetch a random image from the photos array
    const randomImageUrl = response.data.photos[randomIndex].src.original;

    res.status(200).send({
      message: "Image URL received successfully",
      url: randomImageUrl,
    });
  } catch (error) {
    console.error("Pexels API request failed:", error.message);
    res.status(500).json({ error: "Failed to process the text" });
  }
}

module.exports = { handleGreeting, handleChat, handleMediaURL, handleImage };

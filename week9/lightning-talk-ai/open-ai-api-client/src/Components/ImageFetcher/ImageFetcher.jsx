// Import necessary modules and components
import React, { useState } from "react"; // useState is a hook for adding state to function components
import axios from "axios"; // axios is a library for making HTTP requests
import {
  Button,
  TextField,
  Box,
  CardMedia,
  CircularProgress,
} from "@mui/material"; // Importing necessary Material UI components

// Define the ImageFetcher component
function ImageFetcher() {
  // Declare and initialize state variables for text, imageUrl, and isLoading
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle input change events. It updates the text state variable.
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  // Asynchronous function to fetch an image
  const fetchImage = async () => {
    setIsLoading(true); // Indicate that the request has started
    try {
      // Send a POST request to the server
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/image`,
        {
          text,
        }
      );

      // Update the imageUrl state variable with the url received from the server
      setImageUrl(response.data.url);
    } catch (error) {
      // Log any error that occurred
      console.error("API request failed:", error);
    } finally {
      // Indicate that the request has finished
      setIsLoading(false);
    }
  };

  // Return the JSX to render
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Text input field and Fetch Image button */}
      <Box sx={{ display: "flex", width: "50%", gap: 2 }}>
        <TextField
          label="Search Text"
          variant="outlined"
          value={text}
          onChange={handleInputChange}
          sx={{ flexGrow: 1 }} // TextField will take all available space
        />
        <Button variant="contained" color="primary" onClick={fetchImage}>
          Fetch Image
        </Button>
      </Box>
      {/* Display a loading spinner while the request is ongoing */}
      {isLoading && <CircularProgress />}
      {/* If an image URL has been received, display the image */}
      {imageUrl && (
        <CardMedia
          component="img"
          sx={{
            width: "50%",
            border: "2px solid black",
            borderRadius: 2,
          }}
          image={imageUrl}
          alt="From Pexels"
        />
      )}
    </Box>
  );
}

// Export the ImageFetcher component so it can be used in other parts of the app
export default ImageFetcher;

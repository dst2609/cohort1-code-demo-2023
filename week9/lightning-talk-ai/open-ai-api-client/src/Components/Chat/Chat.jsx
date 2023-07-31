// Import necessary modules and components
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  TextField,
  Button,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Define a custom hook to create dynamic styles for the components
const useStyles = makeStyles({
  root: {
    margin: "10px",
    padding: "10px",
  },
  formContainer: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  messageContainer: {
    marginTop: "100px",
    padding: "100px 0",
  },
  message: {
    margin: "10px",
    padding: "10px",
  },
  userMessage: {
    backgroundColor: "#f0f0f0",
  },
  assistantMessage: {
    backgroundColor: "#d0d0d0",
  },
  input: {
    margin: "10px 0",
  },
  codeMessage: {
    fontFamily: "Consolas, monospace",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
  },
});

// Define the Chat component
const Chat = () => {
  // Initialize the custom hook
  const classes = useStyles();

  // Declare and initialize state variables
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create a reference to the message container
  const messageContainerRef = useRef(null);

  // Function to handle input change events
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to handle form submissions
  const handleSubmit = async (e) => {
    // Prevent the form from reloading the page
    e.preventDefault();
    // Indicate that the request has started
    setLoading(true);

    try {
      // Send a POST request to the server
      const result = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/chat`,
        {
          message,
        }
      );

      // Update the chatHistory state variable with the user message and the server response

      setChatHistory([
        ...chatHistory,
        { userMessage: message },
        { response: result.data.message },
      ]);
    } catch (error) {
      // Log any error that occurred
      console.error("Error while sending message:", error);
    } finally {
      setLoading(false);
    }

    setMessage("");
  };

  const getCodeSnippet = (message) => {
    const regex = /```([\s\S]*?)```/;
    const matches = regex.exec(message);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return "";
  };

  // Hook to scroll the message container to the bottom every time chatHistory changes

  useEffect(() => {
    // Scroll to the bottom of the message container after each update
    const container = messageContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [chatHistory]);

  return (
    <div>
      <div className={classes.formContainer}>
        <Paper className={classes.root}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message here"
              label="Type your message here"
              className={classes.input}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              className={classes.input}
            >
              Send
            </Button>
          </form>

          {loading && (
            <div className={classes.input}>
              <CircularProgress size={24} thickness={4} />
              <Typography variant="caption" color="textSecondary">
                Loading...
              </Typography>
            </div>
          )}
        </Paper>
      </div>

      <div className={classes.messageContainer} ref={messageContainerRef}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`${classes.message} ${
              chat.userMessage ? classes.userMessage : classes.assistantMessage
            }`}
          >
            {chat.userMessage && (
              <Typography variant="h5">You: {chat.userMessage}</Typography>
            )}
            {chat.response && (
              <div>
                <Typography variant="h5" align="right">
                  {/* Assistant: */}
                </Typography>
                <>
                  {getCodeSnippet(chat.response) ? (
                    <SyntaxHighlighter
                      language="javascript"
                      style={materialDark}
                      wrapLines={true}
                      showLineNumbers={true}
                      className={classes.codeMessage}
                    >
                      {getCodeSnippet(chat.response)}
                    </SyntaxHighlighter>
                  ) : (
                    <Typography variant="body1">{chat.response}</Typography>
                  )}
                </>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;

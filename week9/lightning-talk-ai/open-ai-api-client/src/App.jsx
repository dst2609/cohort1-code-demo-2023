import React, { useState } from "react";
import ImageFetcher from "./Components/ImageFetcher/ImageFetcher";
import Chat from "./Components/Chat/Chat";

//App component only renders the required component
const App = () => {
  return (
    <ImageFetcher />
    // <Chat />
  );
};

export default App;

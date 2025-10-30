// Importing React libraries
import React from "react";
import ReactDOM from "react-dom/client";

// Importing the main App component
import App from "./App";

// Importing global styles
import "./index.css";

// Creating root element to render React application
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode helps highlight potential problems in the app
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

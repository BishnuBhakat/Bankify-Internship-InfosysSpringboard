// Importing required libraries and components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// App component is the main entry point for all routes
const App = () => {
  return (
    // Router provides navigation functionality
    <Router>
      {/* Define all routes in the app */}
      <Routes>
        {/* Home route for landing page */}
        <Route path="/" element={<Home />} />

        {/* Login page route */}
        <Route path="/login" element={<Login />} />

        {/* Create account route */}
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Customer & Admin dashboards */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

// Exporting App component
export default App;

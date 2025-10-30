import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import AdminDashboard from "../pages/AdminDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";

// Example authentication check (replace with real auth logic)
const isAuthenticated = () => {
  // Check localStorage or context for logged-in user
  return localStorage.getItem("userRole") ? true : false;
};

// Get user role (admin or customer)
const getUserRole = () => {
  return localStorage.getItem("userRole"); // 'admin' or 'customer'
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          isAuthenticated() && getUserRole() === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/customer"
        element={
          isAuthenticated() && getUserRole() === "customer" ? (
            <CustomerDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Redirect unknown routes to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;

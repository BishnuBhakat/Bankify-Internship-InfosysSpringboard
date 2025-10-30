// Importing React and Link for navigation
import React from "react";
import { Link } from "react-router-dom";

// Navbar component for page navigation
const Navbar = () => {
  return (
    // Sticky top navigation bar with Tailwind styling
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo or Brand name */}
      <h1 className="text-2xl font-bold">
        <Link to="/">Bankify</Link>
      </h1>

      {/* Navigation links */}
      <ul className="flex gap-8 text-lg">
        <li>
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="hover:text-gray-300 transition">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-gray-300 transition">
            About
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-gray-300 transition">
            Contact Us
          </a>
        </li>
      </ul>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Join Now
        </Link>
      </div>
    </nav>
  );
};

// Exporting Navbar
export default Navbar;

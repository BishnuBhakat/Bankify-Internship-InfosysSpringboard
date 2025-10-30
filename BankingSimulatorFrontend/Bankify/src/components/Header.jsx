// Importing required dependencies
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Header component for navigation
const Header = () => {
  const navigate = useNavigate(); // Used to navigate between routes
  const location = useLocation(); // To detect the current path

  // Function to handle navigation to a section (like services, about, contact)
  const handleSectionNavigation = (sectionId) => {
    // If the user is already on the home page, just scroll to section
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If the user is on a different page (e.g., /login), navigate home first
      navigate("/");
      // Give a small delay for the home page to load before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo redirects to home page */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
        >
          Bankify
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => handleSectionNavigation("services")}
              className="hover:text-yellow-300 transition"
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionNavigation("about")}
              className="hover:text-yellow-300 transition"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionNavigation("contact")}
              className="hover:text-yellow-300 transition"
            >
              Contact Us
            </button>
          </li>
        </ul>

        {/* Buttons for Login / Join */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Login
          </Link>
          <Link
            to="/create-account"
            className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Join Now
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

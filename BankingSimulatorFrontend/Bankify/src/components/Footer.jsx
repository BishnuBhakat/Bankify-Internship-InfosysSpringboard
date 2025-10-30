// Footer component displayed at the bottom of pages
import React from "react"; // Import React

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-12"> {/* Footer container */}
      <div className="container text-center"> {/* Centered content */}
        <p className="text-sm">© {new Date().getFullYear()} Bankify. All rights reserved.</p> {/* Copyright */}
        <p className="text-sm mt-1">Contact: support@bankify.com | +91 98765 43210</p> {/* Contact info */}
      </div>
    </footer>
  );
};

export default Footer; // Export Footer

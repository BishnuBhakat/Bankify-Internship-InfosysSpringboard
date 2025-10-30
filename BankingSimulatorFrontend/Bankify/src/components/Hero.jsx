// Hero component showing main marketing message and illustration
import React from "react"; // Import React
import { Link } from "react-router-dom"; // changed: use Link for client routing
import Illustration from "../assets/illustrations/hero-illustrations.svg"; // Import hero illustration

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20"> {/* Gradient background */}
      <div className="container flex flex-col lg:flex-row items-center gap-8"> {/* Responsive layout */}
        <div className="flex-1"> {/* Text area */}
          <h1 className="text-5xl font-extrabold mb-4">Bankify — Modern Banking, Made Simple</h1> {/* Headline */}
          <p className="text-lg mb-6 text-blue-100"> {/* Supporting paragraph */}
            Manage accounts, apply for loans, invest, and get support — all within one beautiful app.
          </p>
          <div className="flex gap-4"> {/* Action buttons */}
            <Link to="/create-account" className="border border-white px-5 py-3 rounded-md hover:bg-white hover:text-blue-900">
              Create Account
            </Link>
            <a href="#services" className="bg-yellow-400 text-blue-900 px-5 py-3 rounded-md font-semibold hover:bg-yellow-300">
              Explore Services
            </a>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Hero; // Export Hero component

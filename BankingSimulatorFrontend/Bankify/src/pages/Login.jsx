// Login page presenting animated admin/customer selections and login form
import React, { useState } from "react"; // Import React and state hook
import Header from "../components/Header"; // Import Header for consistent navigation
import AnimatedCard from "../components/AnimatedCard"; // Import selection card
import LoginForm from "../components/LoginForm"; // Import the login form component
import Footer from "../components/Footer"; // Import Footer

const Login = () => {
  const [selected, setSelected] = useState(null); // Track selected login type ('admin' or 'customer')

  return (
    <>
      <Header /> {/* Top header */}

      <main className="container py-12"> {/* Main content container */}
        <h1 className="text-4xl text-center font-bold text-blue-800 mb-8">Login to Bankify</h1> {/* Page heading */}

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center"> {/* Layout for cards and form */}
          <div className="flex gap-6"> {/* Animated selection cards */}
            <AnimatedCard title="Admin" subtitle="Bank administrators" onClick={() => setSelected("admin")} />
            <AnimatedCard title="Customer" subtitle="Personal banking users" onClick={() => setSelected("customer")} />
          </div>

          <div className="w-full max-w-md"> {/* Conditional login form */}
            {selected ? (
              <LoginForm userType={selected} />
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-md text-center"> {/* Prompt to select */}
                <p className="text-gray-600 mb-4">Select Login Type</p>
                <p className="text-sm text-gray-400">Click a card to open the login form for Admin or Customer.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer /> {/* Footer */}
    </>
  );
};

export default Login; // Export Login page

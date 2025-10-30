// Login form component reused for admin/customer login flows
import React, { useState } from "react"; // Import React and useState hook
import { api } from "../api";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LoginForm = ({ userType }) => { // Accept userType prop indicating "admin" or "customer"
  const [formState, setFormState] = useState({ username: "", email: "", pin: "" }); // Local form state (pin instead of password)
  const [pinError, setPinError] = useState(""); // PIN validation error
  const [loading, setLoading] = useState(false); // Loading state for async submit
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => { // Generic change handler for inputs
    const { name, value } = e.target;

    if (name === "pin") {
      // Allow only digits and limit to 6 characters
      const filtered = value.replace(/\D/g, "").slice(0, 6);
      setFormState((s) => ({ ...s, pin: filtered }));

      setPinError(filtered.length === 6 ? "" : "PIN must be exactly 6 digits");
    } else {
      setFormState((s) => ({ ...s, [name]: value })); // Update the changed field
    }
  };

  const handleSubmit = async (e) => { // Form submit handler
    e.preventDefault(); // Prevent default form submit
    if (formState.pin.length !== 6) {
      setPinError("PIN must be exactly 6 digits");
      return;
    }
    setLoading(true);
    setPinError("");
    const path = userType === "admin" ? "/admin/login" : "/customers/login";
    const payload = {
      username: formState.username || undefined,
      email: formState.email || undefined,
      pin: formState.pin,
    };

    try {
      const res = await api.post(path, payload);
      // backend response handling may vary; store token / redirect as needed
      // redirect customer to dashboard after successful login
      if (userType === "customer") {
        navigate("/customer-dashboard");
      } else {
        // optionally redirect admin to admin dashboard
        navigate("/admin-dashboard");
      }
      console.log("Login response:", res);
    } catch (err) {
      console.error(err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isPinValid = formState.pin.length === 6 && !pinError;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md"> {/* Form container */}
      <h3 className="text-xl font-bold text-blue-800 mb-4 capitalize">{userType} login</h3> {/* Dynamic heading */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Username</label> {/* Username label */}
      <input name="username" value={formState.username} onChange={handleChange} placeholder="Username" className="w-full p-2 mb-3 border rounded" /> {/* Username input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Email</label> {/* Email label */}
      <input name="email" value={formState.email} onChange={handleChange} placeholder="Email" type="email" className="w-full p-2 mb-3 border rounded" /> {/* Email input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">PIN</label> {/* PIN label */}
      <input
        name="pin"
        value={formState.pin}
        onChange={handleChange}
        placeholder="PIN (6 digits)"
        type="password"
        inputMode="numeric"
        maxLength={6}
        pattern="\d{6}"
        title="PIN must be exactly 6 digits"
        className="w-full p-2 mb-2 border rounded"
      /> {/* PIN input */}
      {pinError && <p className="text-red-600 text-sm mb-3">{pinError}</p>}
      <div className="flex items-center justify-between mb-4"> {/* Row for options */}
        <label className="flex items-center text-sm">
          <input type="checkbox" className="mr-2" /> {/* Remember me checkbox */}
          Remember me
        </label>
        <a className="text-sm text-blue-600 hover:underline" href="#">Forgot?</a> {/* Forgot link */}
      </div>
      <button
        type="submit"
        disabled={!isPinValid || loading}
        className={`w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 ${(!isPinValid || loading) ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm; // Export LoginForm

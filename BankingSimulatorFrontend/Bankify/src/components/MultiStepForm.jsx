import React, { useState } from "react";
import { api } from "../api"; // use axios wrapper
import { useNavigate } from "react-router-dom"; // ✅ added for navigation

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({
    username: "",
    phone_number: "",
    email: "",
    customer_pin: "",
    dob: "",
    address: "",
    aadhar_number: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    phone_number: "",
    email: "",
    customer_pin: "",
    dob: "",
    aadhar_number: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // ✅ added navigate hook

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value) return "Username is required";
        if (!/^[A-Za-z]+$/.test(value)) return "Username must contain only alphabets";
        return "";
      case "phone_number":
        if (!value) return "Phone number is required";
        if (!/^[69]\d{9}$/.test(value)) return "Phone must be 10 digits starting with 6 or 9";
        return "";
      case "customer_pin":
        if (!value) return "PIN is required";
        if (!/^\d{6}$/.test(value)) return "PIN must be exactly 6 digits";
        return "";
      case "aadhar_number":
        if (!value) return "Aadhaar number is required";
        if (!/^\d{12}$/.test(value)) return "Aadhaar must be 12 digits";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email";
        return "";
      case "dob":
        if (!value) return "Date of birth is required";
        return "";
      default:
        return "";
    }
  };

  const updateField = (field, value) => {
    if (field === "phone_number") value = value.replace(/\D/g, "").slice(0, 10);
    if (field === "customer_pin") value = value.replace(/\D/g, "").slice(0, 6);
    if (field === "aadhar_number") value = value.replace(/\D/g, "").slice(0, 12);

    setFormState((prev) => ({ ...prev, [field]: value }));

    if (["username", "phone_number", "customer_pin", "aadhar_number", "email", "dob"].includes(field)) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const canProceedForStep = (s) => {
    if (s === 1) {
      const uErr = validateField("username", formState.username);
      const pErr = validateField("phone_number", formState.phone_number);
      const aErr = validateField("aadhar_number", formState.aadhar_number);
      const dErr = validateField("dob", formState.dob);
      setErrors((prev) => ({ ...prev, username: uErr, phone_number: pErr, aadhar_number: aErr, dob: dErr }));
      return !(uErr || pErr || aErr || dErr);
    }
    if (s === 2) {
      const eErr = validateField("email", formState.email);
      setErrors((prev) => ({ ...prev, email: eErr }));
      return !eErr;
    }
    return true;
  };

  const next = () => {
    if (canProceedForStep(step)) setStep((s) => Math.min(3, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const pinErr = validateField("customer_pin", formState.customer_pin);
    setErrors((prev) => ({ ...prev, customer_pin: pinErr }));
    if (!canProceedForStep(1) || !canProceedForStep(2) || pinErr) {
      alert("Check the values entered.");
      return setError("Please fix validation errors before submitting.");
    }

    const payload = {
      username: formState.username,
      phone_number: formState.phone_number,
      email: formState.email,
      customer_pin: formState.customer_pin,
      dob: formState.dob,
      address: formState.address,
      aadhar_number: formState.aadhar_number
    };

    setSubmitting(true);
    try {
      const res = await api.post("/customers/create", payload);

      setSuccess("Customer created successfully");
      alert("Customer created successfully!");
      navigate("/login"); // ✅ Redirect to login after success

      setFormState({
        username: "",
        phone_number: "",
        email: "",
        customer_pin: "",
        dob: "",
        address: "",
        aadhar_number: ""
      });
      setErrors({
        username: "",
        phone_number: "",
        email: "",
        customer_pin: "",
        dob: "",
        aadhar_number: ""
      });
      setStep(1);
      console.log("Create customer response:", res);
    } catch (err) {
      console.error(err);
      alert("Check the values entered.");
      setError("Failed to create customer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-blue-600 h-2 rounded" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        {success && <p className="text-sm text-green-600 mb-3">{success}</p>}

        {step === 1 && (
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              className="w-full p-2 mb-1 border rounded"
              value={formState.username}
              onChange={(e) => updateField("username", e.target.value)}
              placeholder="Username"
              required
              pattern="[A-Za-z]+"
              title="Only alphabets allowed"
            />
            {errors.username && <p className="text-red-600 text-sm mb-2">{errors.username}</p>}

            <label className="block text-sm mb-1">Phone</label>
            <input
              className="w-full p-2 mb-1 border rounded"
              value={formState.phone_number}
              onChange={(e) => updateField("phone_number", e.target.value)}
              placeholder="Phone number"
              inputMode="tel"
              maxLength={10}
              required
              title="10 digits starting with 6 or 9"
            />
            {errors.phone_number && <p className="text-red-600 text-sm mb-2">{errors.phone_number}</p>}

            <label className="block text-sm mb-1">Aadhaar Number</label>
            <input
              className="w-full p-2 mb-1 border rounded"
              value={formState.aadhar_number}
              onChange={(e) => updateField("aadhar_number", e.target.value)}
              placeholder="Aadhaar number (12 digits)"
              inputMode="numeric"
              maxLength={12}
              required
            />
            {errors.aadhar_number && <p className="text-red-600 text-sm mb-2">{errors.aadhar_number}</p>}

            <label className="block text-sm mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full p-2 mb-3 border rounded"
              value={formState.dob}
              onChange={(e) => updateField("dob", e.target.value)}
              required
            />
            {errors.dob && <p className="text-red-600 text-sm mb-2">{errors.dob}</p>}
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 mb-1 border rounded"
              value={formState.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Email"
              required
            />
            {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email}</p>}

            <label className="block text-sm mb-1">Address</label>
            <textarea
              className="w-full p-2 mb-3 border rounded"
              value={formState.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Address"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-sm mb-1">PIN</label>
            <input
              name="customer_pin"
              value={formState.customer_pin}
              onChange={(e) => updateField("customer_pin", e.target.value)}
              placeholder="PIN (6 digits)"
              type="password"
              inputMode="numeric"
              maxLength={6}
              pattern="\d{6}"
              title="PIN must be exactly 6 digits"
              className="w-full p-2 mb-1 border rounded"
              required
            />
            {errors.customer_pin && <p className="text-red-600 text-sm mb-2">{errors.customer_pin}</p>}
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" required />
              I accept the terms and conditions
            </label>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={prev}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Back
              </button>
            )}
          </div>

          <div>
            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                  submitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Creating..." : "Create Account"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

import React, { useState } from "react";
import { api } from "../api";

const UpdateCustomerForm = () => {
  const [form, setForm] = useState({
    phone_number: "",
    username: "",
    email: "",
    customer_pin: "",
    address: "",
    dob: "",
    aadhar_number: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // success or error

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customer_pin") {
      const filtered = value.replace(/\D/g, "").slice(0, 6);
      setForm((prev) => ({ ...prev, [name]: filtered }));
      return;
    }

    if (name === "aadhar_number") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/\D/g, "").slice(0, 12) }));
      return;
    }

    if (name === "phone_number") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/\D/g, "").slice(0, 15) }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.phone_number) {
      setMessage("Phone number is required for lookup.");
      return;
    }

    // Build payload only with fields provided (exclude phone_number used as key)
    const payload = {};
    if (form.username) payload.username = form.username;
    if (form.email) payload.email = form.email;
    if (form.customer_pin) {
      if (!/^\d{1,6}$/.test(form.customer_pin)) {
        setMessage("PIN must be 1 to 6 digits.");
        return;
      }
      payload.customer_pin = form.customer_pin;
    }
    if (form.address) payload.address = form.address;
    if (form.dob) payload.dob = form.dob;
    if (form.aadhar_number) payload.aadhar_number = form.aadhar_number;

    if (!Object.keys(payload).length) {
      setMessage("Provide at least one field to update.");
      return;
    }

    setSubmitting(true);
    try {
      // PUT to backend update endpoint for the specific phone number
      await api.put(
        `/customers/update/${encodeURIComponent(form.phone_number)}`,
        payload
      );

      setMessage("Customer updated successfully.");
      setForm({
        phone_number: "",
        username: "",
        email: "",
        customer_pin: "",
        address: "",
        dob: "",
        aadhar_number: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to update customer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {message && (
        <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <div>
        <label className="block mb-1">Phone Number (used to find customer)</label>
        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          inputMode="tel"
          className="w-full border px-3 py-2 rounded"
          placeholder="Phone number (required)"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Username"
        />
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
        />
      </div>

      <div>
        <label className="block mb-1">Customer PIN</label>
        <input
          name="customer_pin"
          type="password"
          value={form.customer_pin}
          onChange={handleChange}
          inputMode="numeric"
          className="w-full border px-3 py-2 rounded"
          placeholder="PIN (digits only, up to 6)"
        />
      </div>

      <div>
        <label className="block mb-1">Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Address"
        />
      </div>

      <div>
        <label className="block mb-1">Date of Birth</label>
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Date of birth"
        />
      </div>

      <div>
        <label className="block mb-1">Aadhaar Number</label>
        <input
          name="aadhar_number"
          value={form.aadhar_number}
          onChange={handleChange}
          inputMode="numeric"
          className="w-full border px-3 py-2 rounded"
          placeholder="Aadhaar number (digits only)"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-60"
      >
        {submitting ? "Updating..." : "Update Customer"}
      </button>
    </form>
  );
};

export default UpdateCustomerForm;
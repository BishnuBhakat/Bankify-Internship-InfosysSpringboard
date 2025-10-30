import React, { useState } from "react";
import { api } from "../api";

const CreateAccountForm = () => {
  const [form, setForm] = useState({
    account_name: "",
    balance: "",
    account_type: "savings",
    account_number: "",
    linked_phone_number: "",
    branch: "",
    ifsc_code: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "linked_phone_number") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/\D/g, "").slice(0, 10) }));
      return;
    }

    if (name === "account_number") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/\D/g, "").slice(0, 18) }));
      return;
    }

    if (name === "balance") {
      const cleaned = value.replace(/[^\d.]/g, "");
      setForm((prev) => ({ ...prev, [name]: cleaned }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};

    if (!form.account_name || !form.account_name.trim()) {
      e.account_name = "Account name is required.";
    }

    const bal = parseFloat(form.balance);
    if (isNaN(bal)) {
      e.balance = "Balance is required and must be a number.";
    } else if (bal <= 500) {
      e.balance = "Balance must be greater than 500.";
    }

    if (!form.account_type) {
      e.account_type = "Account type is required.";
    }

    if (!form.branch || !form.branch.trim()) {
      e.branch = "Branch is required.";
    }

    if (!form.ifsc_code || !form.ifsc_code.trim()) {
      e.ifsc_code = "IFSC code is required.";
    }

    const accNum = form.account_number || "";
    if (!accNum) {
      e.account_number = "Account number is required.";
    } else if (!/^\d{9,18}$/.test(accNum)) {
      e.account_number = "Account number must be 9 to 18 digits.";
    }

    const phone = form.linked_phone_number || "";
    if (phone) {
      if (!/^[69]\d{9}$/.test(phone)) {
        e.linked_phone_number = "Linked phone must be 10 digits starting with 6 or 9.";
      }
    } else {
      e.linked_phone_number = "Linked phone number is required.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      account_name: form.account_name.trim(),
      balance: parseFloat(form.balance),
      account_type: form.account_type,
      account_number: form.account_number,
      linked_phone_number: form.linked_phone_number,
      branch: form.branch.trim(),
      ifsc_code: form.ifsc_code.trim(),
    };

    try {
      // use axios wrapper and new backend endpoint
      await api.post("/accounts/create", payload);

      alert("Account created successfully");
      setForm({
        account_name: "",
        balance: "",
        account_type: "savings",
        account_number: "",
        linked_phone_number: "",
        branch: "",
        ifsc_code: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create account: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Account Name</label>
        <input
          name="account_name"
          value={form.account_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Account name"
          required
        />
        {errors.account_name && <p className="text-red-600 text-sm mt-1">{errors.account_name}</p>}
      </div>

      <div>
        <label className="block mb-1">Balance</label>
        <input
          type="number"
          step="0.01"
          name="balance"
          value={form.balance}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Initial balance (must be > 500)"
          required
        />
        {errors.balance && <p className="text-red-600 text-sm mt-1">{errors.balance}</p>}
      </div>

      <div>
        <label className="block mb-1">Account Type</label>
        <select
          name="account_type"
          value={form.account_type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="savings">Savings</option>
          <option value="current">Current</option>
          <option value="business">Business</option>
        </select>
        {errors.account_type && <p className="text-red-600 text-sm mt-1">{errors.account_type}</p>}
      </div>

      <div>
        <label className="block mb-1">Account Number</label>
        <input
          name="account_number"
          value={form.account_number}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Account number (9-18 digits)"
          required
        />
        {errors.account_number && <p className="text-red-600 text-sm mt-1">{errors.account_number}</p>}
      </div>

      <div>
        <label className="block mb-1">Linked Phone Number</label>
        <input
          name="linked_phone_number"
          value={form.linked_phone_number}
          onChange={handleChange}
          inputMode="tel"
          className="w-full border px-3 py-2 rounded"
          placeholder="10-digit phone starting with 6 or 9"
          required
        />
        {errors.linked_phone_number && <p className="text-red-600 text-sm mt-1">{errors.linked_phone_number}</p>}
      </div>

      <div>
        <label className="block mb-1">Branch</label>
        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Branch"
          required
        />
        {errors.branch && <p className="text-red-600 text-sm mt-1">{errors.branch}</p>}
      </div>

      <div>
        <label className="block mb-1">IFSC Code</label>
        <input
          name="ifsc_code"
          value={form.ifsc_code}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="IFSC code"
          required
        />
        {errors.ifsc_code && <p className="text-red-600 text-sm mt-1">{errors.ifsc_code}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
};

export default CreateAccountForm;

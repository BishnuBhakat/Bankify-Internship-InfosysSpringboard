import React, { useState } from "react";
import { api } from "../api";

const UpdateAccountForm = () => {
  const [form, setForm] = useState({
    account_number: "",
    account_name: "",
    balance: "",
    account_type: "savings",
    linked_phone_number: "",
    branch: "",
    ifsc_code: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // normalize phone and numeric fields
    if (name === "linked_phone_number") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/\D/g, "").slice(0, 10) }));
      return;
    }
    if (name === "account_number") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/\D/g, "").slice(0, 18) }));
      return;
    }
    if (name === "balance") {
      setForm((prev) => ({ ...prev, [name]: value }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.account_number) {
      setMessage("Account number is required.");
      return;
    }

    // Build payload only with fields the user provided
    const payload = {};
    if (form.account_name) payload.account_name = form.account_name;
    if (form.balance !== "") payload.balance = Number(form.balance);
    if (form.account_type) payload.account_type = form.account_type;
    if (form.linked_phone_number) payload.linked_phone_number = form.linked_phone_number;
    if (form.branch) payload.branch = form.branch;
    if (form.ifsc_code) payload.ifsc_code = form.ifsc_code;

    if (Object.keys(payload).length === 0) {
      setMessage("Please provide at least one field to update.");
      return;
    }

    setSubmitting(true);
    try {
      // PUT to backend update endpoint for the specific account number
      await api.put(
        `/accounts/update/${encodeURIComponent(form.account_number)}`,
        payload
      );

      setMessage("Account updated successfully.");
      setForm({
        account_number: "",
        account_name: "",
        balance: "",
        account_type: "savings",
        linked_phone_number: "",
        branch: "",
        ifsc_code: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to update account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {message && <p className="text-sm text-gray-700">{message}</p>}

      <div>
        <label className="block mb-1">Account Number</label>
        <input
          type="text"
          name="account_number"
          value={form.account_number}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Account Name</label>
        <input
          type="text"
          name="account_name"
          value={form.account_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g. John Doe Savings"
        />
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
          placeholder="New balance"
        />
      </div>

      <div>
        <label className="block mb-1">Account Type</label>
        <select
          name="account_type"
          value={form.account_type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="savings">Savings</option>
          <option value="current">Current</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Linked Phone Number</label>
        <input
          type="tel"
          name="linked_phone_number"
          value={form.linked_phone_number}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Phone number"
        />
      </div>

      <div>
        <label className="block mb-1">Branch</label>
        <input
          type="text"
          name="branch"
          value={form.branch}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Branch name"
        />
      </div>

      <div>
        <label className="block mb-1">IFSC Code</label>
        <input
          type="text"
          name="ifsc_code"
          value={form.ifsc_code}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="IFSC code"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-60"
      >
        {submitting ? "Updating..." : "Update Account"}
      </button>
    </form>
  );
};

export default UpdateAccountForm;

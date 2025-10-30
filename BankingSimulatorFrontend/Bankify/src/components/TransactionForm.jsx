import React, { useState } from "react";
import { api } from "../api";

const TransactionForm = () => {
  const [form, setForm] = useState({
    sender_account_number: "",
    receiver_account_number: "",
    transaction_amount: "",
    mode: "transfer",
    description: "",
    pin: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // success or error
  const [showMailPopup, setShowMailPopup] = useState(false); // popup after success
  const [mailMessage, setMailMessage] = useState(""); // email send status
  const [errors, setErrors] = useState({});

  // friendly error popup (show on backend/network error)
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      const filtered = value.replace(/\D/g, "").slice(0, 6);
      setForm((prev) => ({ ...prev, [name]: filtered }));
      setErrors((prev) => ({ ...prev, pin: "" }));
      return;
    }

    if (name === "transaction_amount") {
      const val = value.replace(/[^\d.]/g, "");
      setForm((prev) => ({ ...prev, [name]: val }));
      setErrors((prev) => ({ ...prev, transaction_amount: "" }));
      return;
    }

    if (name === "sender_account_number" || name === "receiver_account_number") {
      // keep digits only and limit to 18
      const digits = value.replace(/\D/g, "").slice(0, 18);
      setForm((prev) => ({ ...prev, [name]: digits }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // mode or description
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};

    if (!/^\d{9,18}$/.test(form.sender_account_number || "")) {
      e.sender_account_number = "Sender account must be 9 to 18 digits.";
    }
    if (!/^\d{9,18}$/.test(form.receiver_account_number || "")) {
      e.receiver_account_number = "Receiver account must be 9 to 18 digits.";
    }
    const amt = Number(form.transaction_amount);
    if (isNaN(amt) || amt <= 0) {
      e.transaction_amount = "Transaction amount must be greater than 0.";
    }
    if (!form.mode || !form.mode.trim()) {
      e.mode = "Mode is required.";
    }
    if (!form.description || !form.description.trim()) {
      e.description = "Description is required.";
    }
    if (!/^\d{6}$/.test(form.pin || "")) {
      e.pin = "PIN must be exactly 6 digits.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowMailPopup(false);
    setMailMessage("");
    setShowErrorPopup(false);
    setErrorPopupMessage("");

    if (!validate()) {
      setMessage("Please fix validation errors.");
      return;
    }

    const payload = {
      sender_account_number: form.sender_account_number,
      receiver_account_number: form.receiver_account_number,
      transaction_amount: Number(form.transaction_amount),
      mode: form.mode,
      description: form.description,
      pin: form.pin,
    };

    setSubmitting(true);
    try {
      // call backend create-transaction endpoint
      const txData = await api.post("/transaction/create-transaction", payload);

      setMessage("Transaction initiated successfully.");

      // assume backend handles sending emails; show popup stating emails sent to respective account holders
      setMailMessage(
        `Transaction completed. Notification emails have been sent to the registered email addresses for accounts ${payload.sender_account_number} and ${payload.receiver_account_number}.`
      );

      setShowMailPopup(true);
      setForm({
        sender_account_number: "",
        receiver_account_number: "",
        transaction_amount: "",
        mode: "transfer",
        description: "",
        pin: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      // show a friendly, non-technical popup instead of raw HTTP/error codes
      setErrorPopupMessage("Transaction failed. Please check the account details, amount and PIN, then try again.");
      setShowErrorPopup(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {message && (
          <p className={`text-sm ${message.startsWith("Transaction") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <div>
          <label className="block mb-1">Sender Account Number</label>
          <input
            type="text"
            name="sender_account_number"
            value={form.sender_account_number}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Sender account number (9-18 digits)"
            required
          />
          {errors.sender_account_number && <p className="text-red-600 text-sm mt-1">{errors.sender_account_number}</p>}
        </div>

        <div>
          <label className="block mb-1">Receiver Account Number</label>
          <input
            type="text"
            name="receiver_account_number"
            value={form.receiver_account_number}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Receiver account number (9-18 digits)"
            required
          />
          {errors.receiver_account_number && <p className="text-red-600 text-sm mt-1">{errors.receiver_account_number}</p>}
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="transaction_amount"
            value={form.transaction_amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Amount"
            step="0.01"
            min="0.01"
            required
          />
          {errors.transaction_amount && <p className="text-red-600 text-sm mt-1">{errors.transaction_amount}</p>}
        </div>

        <div>
          <label className="block mb-1">Mode</label>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="transfer">Transfer</option>
            <option value="NEFT">NEFT</option>
            <option value="IMPS">IMPS</option>
            <option value="RTGS">RTGS</option>
          </select>
          {errors.mode && <p className="text-red-600 text-sm mt-1">{errors.mode}</p>}
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Description"
            required
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block mb-1">PIN</label>
          <input
            type="password"
            name="pin"
            value={form.pin}
            onChange={handleChange}
            inputMode="numeric"
            className="w-full border px-3 py-2 rounded"
            placeholder="PIN (6 digits)"
            required
          />
          {errors.pin && <p className="text-red-600 text-sm mt-1">{errors.pin}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {submitting ? "Processing..." : "Submit Transaction"}
        </button>
      </form>

      {/* Simple modal popup informing that mails were sent (or mail status) */}
      {showMailPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Transaction Completed</h3>
            <p className="mb-2">{mailMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowMailPopup(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Friendly error popup (no raw HTTP codes) */}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2 text-red-600">Transaction Failed</h3>
            <p className="mb-4">{errorPopupMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorPopup(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionForm;

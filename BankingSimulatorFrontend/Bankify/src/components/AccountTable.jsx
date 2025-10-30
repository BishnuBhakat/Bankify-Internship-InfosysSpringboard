import React, { useEffect, useState } from "react";
import { api } from "../api";

// Table to display all accounts
const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get("/admin/all-accounts");
        if (mounted) setAccounts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to load accounts");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAccounts();
    return () => {
      mounted = false;
    };
  }, []);

  const fmtDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleString();
  };

  if (loading) return <p className="text-sm text-gray-600">Loading accounts...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;
  if (!accounts.length) return <p className="text-sm text-gray-600">No accounts found.</p>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="p-2 border">Account ID</th>
            <th className="p-2 border">Customer ID</th>
            <th className="p-2 border">Aadhaar</th>
            <th className="p-2 border">Account Name</th>
            <th className="p-2 border">Account No.</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Linked Phone</th>
            <th className="p-2 border">Branch</th>
            <th className="p-2 border">IFSC</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Modified At</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <tr key={a.account_id || a.account_number} className="text-sm odd:bg-white even:bg-gray-50">
              <td className="p-2 border">{a.account_id ?? "-"}</td>
              <td className="p-2 border">{a.customer_id ?? "-"}</td>
              <td className="p-2 border">{a.aadhar_number ?? "-"}</td>
              <td className="p-2 border">{a.account_name ?? "-"}</td>
              <td className="p-2 border">{a.account_number ?? "-"}</td>
              <td className="p-2 border">{a.account_type ?? "-"}</td>
              <td className="p-2 border">{typeof a.balance === "number" ? a.balance.toFixed(2) : a.balance ?? "-"}</td>
              <td className="p-2 border">{a.linked_phone_number ?? "-"}</td>
              <td className="p-2 border">{a.branch ?? "-"}</td>
              <td className="p-2 border">{a.ifsc_code ?? "-"}</td>
              <td className="p-2 border">{a.account_status ?? "-"}</td>
              <td className="p-2 border">{fmtDate(a.created_at)}</td>
              <td className="p-2 border">{fmtDate(a.modified_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;

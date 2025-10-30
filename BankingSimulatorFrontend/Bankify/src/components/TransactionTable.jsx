import React, { useEffect, useState } from "react";
import { api } from "../api";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get("/admin/all-transactions");
        if (mounted) setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to load transactions");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTransactions();
    return () => {
      mounted = false;
    };
  }, []);

  const fmtDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleString();
  };

  if (loading) return <p className="text-sm text-gray-600">Loading transactions...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;
  if (!transactions.length) return <p className="text-sm text-gray-600">No transactions found.</p>;

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Account ID</th>
            <th className="p-2 border">Sender Account</th>
            <th className="p-2 border">Receiver Account</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Mode</th>
            <th className="p-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transaction_id || `${t.account_id}-${t.transaction_date}`} className="text-sm odd:bg-white even:bg-gray-50">
              <td className="p-2 border">{t.transaction_id ?? "-"}</td>
              <td className="p-2 border">{t.account_id ?? "-"}</td>
              <td className="p-2 border">{t.sender_account_number ?? "-"}</td>
              <td className="p-2 border">{t.receiver_account_number ?? "-"}</td>
              <td className="p-2 border">{typeof t.transaction_amount === "number" ? t.transaction_amount.toFixed(2) : t.transaction_amount ?? "-"}</td>
              <td className="p-2 border">{fmtDate(t.transaction_date)}</td>
              <td className="p-2 border">{t.mode ?? "-"}</td>
              <td className="p-2 border">{t.description ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

import React, { useEffect, useState } from "react";
import { api } from "../api";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get("/admin/all-customers");
        if (mounted) setCustomers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to load customers");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCustomers();
    return () => {
      mounted = false;
    };
  }, []);

  const fmtDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleDateString();
  };

  if (loading) return <p className="text-sm text-gray-600">Loading customers...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;
  if (!customers.length) return <p className="text-sm text-gray-600">No customers found.</p>;

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="p-2 border">Customer ID</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">PIN</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Aadhaar</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.customer_id || c.username} className="text-sm odd:bg-white even:bg-gray-50">
              <td className="p-2 border">{c.customer_id ?? "-"}</td>
              <td className="p-2 border">{c.username ?? "-"}</td>
              <td className="p-2 border">{c.phone_number ?? "-"}</td>
              <td className="p-2 border">{c.email ?? "-"}</td>
              <td className="p-2 border">{c.customer_pin ?? "-"}</td>
              <td className="p-2 border">{c.address ?? "-"}</td>
              <td className="p-2 border">{fmtDate(c.dob)}</td>
              <td className="p-2 border">{c.aadhar_number ?? "-"}</td>
              <td className="p-2 border">{c.customer_status ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import CustomerTable from "../components/CustomerTable";
import AccountTable from "../components/AccountTable";
import TransactionTable from "../components/TransactionTable";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Customers");
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear any auth data stored in browser and redirect to login
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn("Failed to clear storage on logout", e);
    }
    navigate("/login");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <Tabs
        tabs={["Customers", "Accounts", "Transactions"]}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === "Customers" && <CustomerTable />}
        {activeTab === "Accounts" && <AccountTable />}
        {activeTab === "Transactions" && <TransactionTable />}
      </div>
    </div>
  );
};

export default AdminDashboard;

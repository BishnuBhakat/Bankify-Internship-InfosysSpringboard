import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import AccountTable from "../components/AccountTable";
import TransactionTable from "../components/TransactionTable";
import CreateAccountForm from "../components/CreateAccountForm";
import UpdateAccountForm from "../components/UpdateAccountForm";
import TransactionForm from "../components/TransactionForm";
import UpdateCustomerForm from "../components/UpdateCustomerForm";
import axios from "axios";
import { BASE_URL } from "../api";

const ViewCustomerSection = () => {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchCustomer = async () => {
    setErr("");
    setCustomer(null);
    if (!phone) {
      setErr("Phone number required.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/customers/fetch/${encodeURIComponent(phone)}`);
      setCustomer(res.data || null);
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.message || e.message || "Failed to fetch customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.trim())}
          placeholder="Customer phone number"
          className="border px-3 py-2 rounded flex-1"
        />
        <button onClick={fetchCustomer} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Fetch</button>
      </div>

      {loading && <p className="text-sm text-gray-600">Loading...</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      {customer && (
        <div className="p-4 border rounded bg-gray-50 text-sm space-y-2">
          <div><strong>Customer ID:</strong> {customer.customer_id ?? "-"}</div>
          <div><strong>Username:</strong> {customer.username ?? "-"}</div>
          <div><strong>Phone:</strong> {customer.phone_number ?? "-"}</div>
          <div><strong>Email:</strong> {customer.email ?? "-"}</div>
          <div><strong>Address:</strong> {customer.address ?? "-"}</div>
          <div><strong>DOB:</strong> {customer.dob ?? "-"}</div>
          <div><strong>Aadhaar:</strong> {customer.aadhar_number ?? "-"}</div>
          <div><strong>Status:</strong> {customer.customer_status ?? "-"}</div>
          <div><strong>PIN:</strong> {customer.customer_pin ? "******" : "-"}</div>
        </div>
      )}
    </div>
  );
};

const DeleteCustomerSection = ({ onDeleted }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleDelete = async () => {
    setMsg("");
    if (!phone) {
      setMsg("Phone number required.");
      return;
    }
    if (!window.confirm(`Delete customer with phone ${phone}? This cannot be undone.`)) return;
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/customers/delete/${encodeURIComponent(phone)}`);
      setMsg("Customer deleted successfully.");
      setPhone("");
      if (onDeleted) onDeleted();
    } catch (e) {
      console.error(e);
      setMsg(e.response?.data?.message || e.message || "Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-3">
      {msg && <p className={`text-sm ${msg.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"}`}>{msg}</p>}
      <div className="flex gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.trim())}
          placeholder="Customer phone number to delete"
          className="border px-3 py-2 rounded flex-1"
        />
        <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">Delete</button>
      </div>
    </div>
  );
};

const AccountsByAccountNumber = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchAccount = async () => {
    setErr("");
    setAccount(null);
    if (!accountNumber) {
      setErr("Account number required.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/accounts/fetch/accountNumber/${encodeURIComponent(accountNumber)}`);
      setAccount(res.data || null);
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.message || e.message || "Failed to fetch account");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!accountNumber) {
      setErr("Account number required for delete.");
      return;
    }
    if (!window.confirm(`Delete account ${accountNumber}? This action cannot be undone.`)) return;
    setLoading(true);
    setErr("");
    try {
      await axios.delete(`${BASE_URL}/accounts/delete/${encodeURIComponent(accountNumber)}`);
      setAccount(null);
      setAccountNumber("");
      setErr("Account deleted successfully.");
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.message || e.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex gap-2">
        <input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.trim())}
          placeholder="Enter account number"
          className="border px-3 py-2 rounded flex-1"
        />
        <button onClick={fetchAccount} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Fetch</button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">Delete</button>
      </div>

      {loading && <p className="text-sm text-gray-600">Loading...</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      {account ? (
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
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
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border">{account.account_id ?? "-"}</td>
                <td className="p-2 border">{account.customer_id ?? "-"}</td>
                <td className="p-2 border">{account.aadhar_number ?? "-"}</td>
                <td className="p-2 border">{account.account_name ?? "-"}</td>
                <td className="p-2 border">{account.account_number ?? "-"}</td>
                <td className="p-2 border">{account.account_type ?? "-"}</td>
                <td className="p-2 border">{typeof account.balance === "number" ? account.balance.toFixed(2) : account.balance ?? "-"}</td>
                <td className="p-2 border">{account.linked_phone_number ?? "-"}</td>
                <td className="p-2 border">{account.branch ?? "-"}</td>
                <td className="p-2 border">{account.ifsc_code ?? "-"}</td>
                <td className="p-2 border">{account.account_status ?? "-"}</td>
                <td className="p-2 border">{account.created_at ?? "-"}</td>
                <td className="p-2 border">{account.modified_at ?? "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No account selected.</p>
      )}
    </div>
  );
};

const TransactionsByAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumbers, setAccountNumbers] = useState([]); // multiple accounts for customer
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    // Auto-fetch transactions for the logged-in customer if we have account(s) saved locally
    const savedAccount = localStorage.getItem("account_number");
    const savedAccounts = localStorage.getItem("account_numbers");
    const customerPhone = localStorage.getItem("customer_phone");

    // prefer explicit saved accounts
    if (savedAccounts) {
      try {
        const arr = JSON.parse(savedAccounts);
        if (Array.isArray(arr) && arr.length) {
          setAccountNumbers(arr);
          fetchTransactionsForAccounts(arr);
          return;
        }
      } catch (e) {
        console.warn("Invalid account_numbers in localStorage", e);
      }
    }

    if (savedAccount) {
      setAccountNumber(savedAccount);
      setAccountNumbers([savedAccount]);
      fetchTransactionsForAccounts([savedAccount]);
      return;
    }

    // if customer phone is saved (e.g. after login), try to fetch accounts for that phone
    if (customerPhone) {
      (async () => {
        setLoading(true);
        try {
          // best-effort: backend may accept linked_phone_number as query param
          const accRes = await axios.get(`${BASE_URL}/accounts`, {
            params: { linked_phone_number: customerPhone },
          });
          const accs = Array.isArray(accRes.data) ? accRes.data : [];
          const acctNums = accs.map((a) => a.account_number).filter(Boolean);
          if (acctNums.length) {
            setAccountNumbers(acctNums);
            // save for future quick access
            localStorage.setItem("account_numbers", JSON.stringify(acctNums));
            fetchTransactionsForAccounts(acctNums);
          }
        } catch (e) {
          console.warn("Failed to auto-fetch accounts by phone:", e.response?.data || e.message);
        } finally {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTransactionsForAccounts = async (acctArray) => {
    if (!Array.isArray(acctArray) || acctArray.length === 0) {
      setErr("No account number available to fetch transactions.");
      return;
    }
    setErr("");
    setTransactions(null);
    setLoading(true);
    try {
      // fetch transactions for each account and merge results
      const allTx = [];
      for (const acct of acctArray) {
        try {
          const res = await axios.get(`${BASE_URL}/transaction/get-transaction/${encodeURIComponent(acct)}`);
          const txs = Array.isArray(res.data) ? res.data : [];
          // attach account reference if not present
          txs.forEach((t) => {
            if (!t.account_number && acct) t.account_number = acct;
          });
          allTx.push(...txs);
        } catch (innerErr) {
          console.warn(`Failed to fetch transactions for ${acct}`, innerErr);
        }
      }
      // deduplicate by transaction_id (if available)
      const dedup = [];
      const seen = new Set();
      for (const t of allTx) {
        const key = t.transaction_id ?? `${t.account_number}-${t.transaction_date}-${t.transaction_amount}`;
        if (!seen.has(key)) {
          seen.add(key);
          dedup.push(t);
        }
      }
      setTransactions(dedup);
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.message || e.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const fetchForAccount = async () => {
    // manual fetch when user provides an account number
    if (!accountNumber) {
      setErr("Account number required.");
      return;
    }
    setAccountNumbers([accountNumber]);
    await fetchTransactionsForAccounts([accountNumber]);
    // optional fetch account details
    try {
      const accRes = await axios.get(
        `${BASE_URL}/accounts/fetch/accountNumber/${encodeURIComponent(accountNumber)}`
      );
      setAccountDetails(accRes.data || null);
    } catch (e) {
      console.warn("Failed to fetch account details:", e.response?.data?.message || e.message);
    }
  };

  // Download uses first available account number (or provided)
  const downloadTransactions = async (acctNum) => {
    const acct = acctNum || accountNumbers[0];
    if (!acct) {
      setErr("Account number required for download.");
      return;
    }
    setErr("");
    setLoading(true);
    try {
      const resp = await axios.get(`${BASE_URL}/transaction/download-transactions/${encodeURIComponent(acct)}`, {
        responseType: "blob",
      });

      let filename = `transactions_${acct}.xlsx`;
      const cd = resp.headers && (resp.headers["content-disposition"] || resp.headers["Content-Disposition"]);
      if (cd) {
        const match = cd.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/);
        if (match) filename = decodeURIComponent(match[1] || match[2]);
      }

      const blob = new Blob([resp.data], { type: resp.data.type || "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.message || e.message || "Failed to download transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchForAccount();
        }}
        className="flex items-center gap-3"
      >
        <input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.trim())}
          placeholder="Account number (optional - auto-fetched for logged-in customer)"
          className="border px-3 py-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Get Transactions</button>
      </form>

      {loading && <p className="text-sm text-gray-600">Loading...</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      {accountNumbers.length > 0 && (
        <div className="text-sm text-gray-700">
          Auto-fetched accounts: {accountNumbers.join(", ")}
        </div>
      )}

      {accountDetails && (
        <div className="p-3 border rounded bg-gray-50">
          <div className="text-sm"><strong>Account:</strong> {accountDetails.account_number ?? "-"}</div>
          <div className="text-sm"><strong>Name:</strong> {accountDetails.account_name ?? "-"}</div>
          <div className="text-sm"><strong>Balance:</strong> {typeof accountDetails.balance === "number" ? accountDetails.balance.toFixed(2) : accountDetails.balance ?? "-"}</div>
          <div className="text-sm"><strong>Branch:</strong> {accountDetails.branch ?? "-"}</div>
        </div>
      )}

      {transactions && (
        <div>
          <div className="flex justify-end mb-2">
            <button
              onClick={() => downloadTransactions(accountNumbers[0])}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              disabled={!accountNumbers.length || loading}
            >
              Download Transactions 
            </button>
          </div>

          <div className="overflow-auto">
            {transactions.length === 0 ? (
              <p className="text-sm text-gray-600">No transactions found for this account.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300 text-left text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Transaction ID</th>
                    <th className="p-2 border">Account No.</th>
                    <th className="p-2 border">Sender</th>
                    <th className="p-2 border">Receiver</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Mode</th>
                    <th className="p-2 border">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.transaction_id ?? `${t.account_number}-${t.transaction_date}`} className="odd:bg-white even:bg-gray-50">
                      <td className="p-2 border">{t.transaction_id ?? "-"}</td>
                      <td className="p-2 border">{t.account_number ?? t.account_id ?? "-"}</td>
                      <td className="p-2 border">{t.sender_account_number ?? t.senderAccount ?? "-"}</td>
                      <td className="p-2 border">{t.receiver_account_number ?? t.reciever_account_number ?? t.receiverAccount ?? "-"}</td>
                      <td className="p-2 border">{typeof t.transaction_amount === "number" ? t.transaction_amount.toFixed(2) : t.transaction_amount ?? "-"}</td>
                      <td className="p-2 border">{t.transaction_date ?? "-"}</td>
                      <td className="p-2 border">{t.mode ?? "-"}</td>
                      <td className="p-2 border">{t.description ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Your Details");
  const [subTab, setSubTab] = useState("View Details");
  const [accountsRefreshKey, setAccountsRefreshKey] = useState(0);

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

  const renderDetailsSub = () => (
    <div>
      <div className="flex space-x-4 mb-4">
        {["View Details", "Edit Details", "Delete Customer"].map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-3 py-2 rounded-md ${subTab === t ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === "View Details" && <ViewCustomerSection />}
      {subTab === "Edit Details" && <UpdateCustomerForm />}
      {subTab === "Delete Customer" && <DeleteCustomerSection onDeleted={() => { /* optionally refresh something */ }} />}
    </div>
  );

  const renderAccountsSub = () => (
    <div>
      <div className="flex space-x-4 mb-4">
        {["View", "Add", "Edit", "Delete"].map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-3 py-2 rounded-md ${subTab === t ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === "View" && <AccountsByAccountNumber key={accountsRefreshKey} />}
      {subTab === "Add" && <CreateAccountForm />}
      {subTab === "Edit" && <UpdateAccountForm />}
      {subTab === "Delete" && <AccountsByAccountNumber key={accountsRefreshKey} />}
    </div>
  );

  const renderTransactionsSub = () => (
    <div>
      <div className="flex space-x-4 mb-4">
        {["Initiate Transaction", "Get Transactions"].map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-3 py-2 rounded-md ${subTab === t ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === "Initiate Transaction" && <TransactionForm />}
      {subTab === "Get Transactions" && <TransactionsByAccount />}
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Customer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      
      <Tabs
        tabs={["Your Details", "Accounts", "Transactions"]}
        activeTab={activeTab}
        onTabClick={(t) => {
          setActiveTab(t);
          setSubTab(t === "Your Details" ? "View Details" : "View");
        }}
      />

      <div className="mt-6">
        {activeTab === "Your Details" && renderDetailsSub()}
        {activeTab === "Accounts" && renderAccountsSub()}
        {activeTab === "Transactions" && renderTransactionsSub()}
      </div>
    </div>
  );
};

export default CustomerDashboard;
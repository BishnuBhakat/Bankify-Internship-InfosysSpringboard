package org.example.repository;

import org.example.Config.DBConfig;
import org.example.Models.Transaction;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class TransactionRepoImpl implements TransactionRepo {
    private final Connection conn = DBConfig.getConnection();

    @Override
    public boolean createTransaction(Transaction transaction) throws Exception {
        String getAccountId = "SELECT account_id FROM account WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(getAccountId)) {
            ps.setString(1, transaction.getSender_account_number());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                throw new Exception("Account not found with account number");
            }
            int accountId = rs.getInt("account_id");
            transaction.setAccount_id(accountId);
            String sql = "INSERT INTO transaction (account_id,transaction_amount,sender_account_number," +
                    "receiver_account_number,mode,description) VALUES (?,?,?,?,?,?)";
            try (Connection conn1 = DBConfig.getConnection();
                 PreparedStatement ps1 = conn1.prepareStatement(sql)) {
                ps1.setInt(1, transaction.getAccount_id());
                ps1.setDouble(2, transaction.getTransaction_amount());
                ps1.setString(3, transaction.getSender_account_number());
                ps1.setString(4, transaction.getReceiver_account_number());
                ps1.setString(5, transaction.getMode());
                ps1.setString(6, transaction.getDescription());
                int rowsAffected = ps1.executeUpdate();
                return rowsAffected > 0;
            }
        }
    }

    @Override
    public List<Transaction> getTransactionsByAccountNumber(String accountNumber) throws Exception {
        String sql = "SELECT * FROM transaction WHERE sender_account_number=? OR receiver_account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            ps.setString(2, accountNumber);
            ResultSet rs = ps.executeQuery();
            List<Transaction> transactions = new ArrayList<>();
            while (rs.next()) {
                Transaction transaction = mapResultSetToTransaction(rs);
                transactions.add(transaction);
            }
            return transactions;
        }
    }

    @Override
    public List<Transaction> getAllTransactions() throws Exception {
        List<Transaction> list=new ArrayList<>();
        String sql= "SELECT * FROM transaction";
        try (Connection conn = DBConfig.getConnection(); Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                list.add(mapResultSetToTransaction(rs));
            }
        }
        return list;
    }

    @Override
    public boolean matchPin(String account_number,String pin) throws Exception {
        String sql = """
            SELECT c.customer_pin FROM Customer c
            JOIN Account a ON c.customer_id = a.customer_id
            WHERE a.account_number = ?
        """;
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, account_number);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String actualPin = rs.getString("customer_pin");
                return actualPin.equals(pin);
            } else {
                throw new Exception("No customer found for given account number");
            }
        }
    }

    @Override
    public boolean checkAccountExists(String accountNumber) throws Exception {
        String sql = "SELECT 1 FROM account WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    @Override
    public double getAccountBalance(String accountNumber) throws Exception {
        String sql = "SELECT balance FROM account WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getDouble("balance");
            } else {
                throw new Exception("Account not found with account number: " + accountNumber);
            }
        }
    }

    @Override
    public boolean updateAccountBalance(String accountNumber, double newBalance) throws Exception {
        String sql = "UPDATE account SET balance=? WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setDouble(1, newBalance);
            ps.setString(2, accountNumber);
            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        }
    }

    @Override
    public String getEmailByAccountNumber(String accountNumber) throws Exception {
        String sql = """
        SELECT c.email FROM customer c
        JOIN account a ON c.customer_id = a.customer_id
        WHERE a.account_number = ?
    """;
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getString("email");
            } else {
                throw new Exception("Email not found for account number: " + accountNumber);
            }
        }
    }

    private Transaction mapResultSetToTransaction(ResultSet rs) throws Exception {
        Transaction transaction = new Transaction();
        transaction.setTransaction_id(rs.getInt("transaction_id"));
        transaction.setAccount_id(rs.getInt("account_id"));
        transaction.setTransaction_amount(rs.getDouble("transaction_amount"));
        transaction.setTransaction_date(rs.getTimestamp("transaction_date"));
        transaction.setSender_account_number(rs.getString("sender_account_number"));
        transaction.setReceiver_account_number(rs.getString("receiver_account_number"));
        transaction.setMode(rs.getString("mode"));
        transaction.setDescription(rs.getString("description"));
        return transaction;
    }
}

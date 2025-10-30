package org.example.repository;

import org.example.Config.DBConfig;
import org.example.Models.Account;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AccountRepoImpl implements AccountRepo {

    @Override
    public boolean createAccount(Account account) throws Exception {
        String getCustomerIdQuery = "SELECT customer_id FROM Customer WHERE phone_number=?";
        String getAadharQuery = "SELECT aadhar_number FROM Customer WHERE phone_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(getCustomerIdQuery)) {
            ps.setString(1, account.getLinked_phone_number());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                throw new Exception("Customer not found with the given phone number");
            }
            int customerId = rs.getInt("customer_id");
            account.setCustomer_id(customerId);
            try (Connection conn1 = DBConfig.getConnection();
                 PreparedStatement ps1 = conn1.prepareStatement(getAadharQuery)) {
                ps1.setString(1, account.getLinked_phone_number());
                ResultSet rs1 = ps1.executeQuery();
                if (!rs1.next()) {
                    throw new Exception("Aadhar number not found for the given phone number");
                }
                String aadhar_number = rs1.getString("aadhar_number");
                account.setAadhar_number(aadhar_number);
                if (existsByAccountNumber(account.getAccount_number())) {
                    throw new Exception("Account number already exists");
                }
                String sql = "INSERT INTO Account(customer_id,aadhar_number,account_name,balance," +
                        "account_type,account_number,linked_phone_number,branch,ifsc_code,account_status)" +
                        " VALUES(?,?,?,?,?,?,?,?,?,?)";
                try (Connection conn2 = DBConfig.getConnection();
                     PreparedStatement ps2 = conn2.prepareStatement(sql)) {
                    ps2.setInt(1, account.getCustomer_id());
                    ps2.setString(2, account.getAadhar_number());
                    ps2.setString(3, account.getAccount_name());
                    ps2.setDouble(4, account.getBalance());
                    ps2.setString(5, account.getAccount_type());
                    ps2.setString(6, account.getAccount_number());
                    ps2.setString(7, account.getLinked_phone_number());
                    ps2.setString(8, account.getBranch());
                    ps2.setString(9, account.getIfsc_code());
                    ps2.setString(10, account.getAccount_status().name());
                    int rows = ps2.executeUpdate();
                    return rows > 0;
                }
            }
        }
    }

    @Override
    public boolean updateAccount(String account_number, Account account) throws Exception {
        String sql = "UPDATE Account SET  account_name=?, balance=?, account_type=?, account_number=?," +
                " linked_phone_number=?, branch=?, ifsc_code=?, account_status=?" +
                " WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, account.getAccount_name());
            ps.setDouble(2, account.getBalance());
            ps.setString(3, account.getAccount_type());
            ps.setString(4, account.getAccount_number());
            ps.setString(5, account.getLinked_phone_number());
            ps.setString(6, account.getBranch());
            ps.setString(7, account.getIfsc_code());
            ps.setString(8, account.getAccount_status().name());
            ps.setString(9, account_number);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    @Override
    public boolean deleteAccount(String account_number) throws Exception {
        String sql = "DELETE FROM Account WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, account_number);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    private Account mapResultSetToAccount(ResultSet rs) throws SQLException {
        Account account = new Account();
        account.setAccount_id(rs.getInt("account_id"));
        account.setCustomer_id(rs.getInt("customer_id"));
        account.setAadhar_number(rs.getString("aadhar_number"));
        account.setCreated_at(rs.getTimestamp("created_at"));
        account.setModified_at(rs.getTimestamp("modified_at"));
        account.setAccount_name(rs.getString("account_name"));
        account.setBalance(rs.getDouble("balance"));
        account.setAccount_type(rs.getString("account_type"));
        account.setAccount_number(rs.getString("account_number"));
        account.setLinked_phone_number(rs.getString("linked_phone_number"));
        account.setBranch(rs.getString("branch"));
        account.setIfsc_code(rs.getString("ifsc_code"));
        account.setAccount_status(Account.status.valueOf(rs.getString("account_status")));
        return account;
    }

    @Override
    public Account getAccountByAccountNumber(String accountNumber) throws Exception {
        String sql = "SELECT * FROM Account WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return mapResultSetToAccount(rs);
            }
        }
        return null;
    }

    @Override
    public List<Account> getAllAccounts() throws Exception {
        List<Account> list = new ArrayList<>();
        String sql = "SELECT * FROM Account";
        try (Connection conn = DBConfig.getConnection(); Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                list.add(mapResultSetToAccount(rs));
            }
        }
        return list;
    }
    // not used now
    @Override
    public boolean existsById(int customer_id) throws Exception {
      String sql = "SELECT 1 FROM Customer WHERE customer_id=?";
        try (Connection conn = DBConfig.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, customer_id);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    @Override
    public boolean existsByAccountNumber(String account_number) throws Exception {
        String sql = "SELECT 1 FROM Account WHERE account_number=?";
        try (Connection conn = DBConfig.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, account_number);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    @Override
    public boolean exitsByAadharNumber(String aadhar_number) throws Exception {
        String sql = "SELECT 1 FROM Customer WHERE aadhar_number=?";
        try (Connection conn = DBConfig.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, aadhar_number);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }
        }
        return false;
    }
}

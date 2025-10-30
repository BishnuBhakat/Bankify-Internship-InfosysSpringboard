package org.example.repository;

import org.example.Config.DBConfig;
import org.example.Models.Customer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class CustomerRepoImpl implements CustomerRepo {

    @Override
    public boolean createCustomer(Customer customer) throws Exception {
        if(existsByPhoneNumber(customer.getPhone_number())){
            throw new Exception("Phone number already exists");
        }
        if(existsByAadhar(customer.getAadhar_number())){
            throw new Exception("Aadhar number already exists");
        }
        String sql="INSERT INTO Customer(username,phone_number,email,customer_pin,address,dob,aadhar_number,customer_status)" +
                " VALUES(?,?,?,?,?,?,?,?)";
        try(Connection conn= DBConfig.getConnection();
            PreparedStatement ps=conn.prepareStatement(sql)) {
            ps.setString(1, customer.getUsername());
            ps.setString(2, customer.getPhone_number());
            ps.setString(3, customer.getEmail());
            ps.setString(4, customer.getCustomer_pin());
            ps.setString(5, customer.getAddress());
            ps.setString(6, customer.getDob());
            ps.setString(7, customer.getAadhar_number());
            ps.setString(8, customer.getCustomer_status().name());
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    @Override
    public boolean updateCustomer(String phone_number,Customer customer) throws Exception {
    String sql="UPDATE Customer SET username=?, phone_number=?, email=?, customer_pin=?, address=?," +
            " dob=?, aadhar_number=?, customer_status=? WHERE phone_number=?";
        try(Connection conn= DBConfig.getConnection();
            PreparedStatement ps=conn.prepareStatement(sql)) {
            ps.setString(1, customer.getUsername());
            ps.setString(2, customer.getPhone_number());
            ps.setString(3, customer.getEmail());
            ps.setString(4, customer.getCustomer_pin());
            ps.setString(5, customer.getAddress());
            ps.setString(6, customer.getDob());
            ps.setString(7, customer.getAadhar_number());
            ps.setString(8, customer.getCustomer_status().name());
            ps.setString(9, phone_number);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    @Override
    public boolean deleteCustomer(String phone_number) throws Exception {
    String sql="DELETE FROM Customer WHERE phone_number=?";
        try(Connection conn= DBConfig.getConnection();
            PreparedStatement ps=conn.prepareStatement(sql)) {
            ps.setString(1, phone_number);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    @Override
    public Customer getCustomerByNumber(String phone_number) throws Exception {
    String sql="SELECT * FROM Customer WHERE phone_number=?";
        try(Connection conn= DBConfig.getConnection();
            PreparedStatement ps=conn.prepareStatement(sql)) {
            ps.setString(1, phone_number);
            ResultSet rs=ps.executeQuery();
                if(rs.next()){
                    return mapResultSetToCustomer(rs);
                }
            }
        return null;
    }

    private Customer mapResultSetToCustomer(ResultSet rs) throws SQLException{
        Customer customer=new Customer();
        customer.setCustomer_id(rs.getInt("customer_id"));
        customer.setUsername(rs.getString("username"));
        customer.setPhone_number(rs.getString("phone_number"));
        customer.setEmail(rs.getString("email"));
        customer.setCustomer_pin(rs.getString("customer_pin"));
        customer.setAddress(rs.getString("address"));
        customer.setDob(rs.getString("dob"));
        customer.setAadhar_number(rs.getString("aadhar_number"));
        customer.setCustomer_status(Customer.status.valueOf(rs.getString("customer_status")));
        return customer;
    }

    @Override
    public List<Customer> getAllCustomers() throws Exception {
        List<Customer> list = new ArrayList<>();
        String sql = "SELECT * FROM customer";
        try (Connection conn = DBConfig.getConnection(); Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                list.add(mapResultSetToCustomer(rs));
            }
        }
        return list;
    }

    @Override
    public boolean existsByPhoneNumber(String phoneNumber) throws Exception {
        String sql = "SELECT 1 FROM customer WHERE phone_number=?";
        try (Connection conn = DBConfig.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, phoneNumber);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    @Override
    public boolean existsByAadhar(String aadharNumber) throws Exception {
        String sql = "SELECT 1 FROM customer WHERE aadhar_number=?";
        try (Connection conn = DBConfig.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, aadharNumber);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    @Override
    public boolean verifyLogin(String username, String email, String pin) throws Exception {
        String sql = "SELECT 1 FROM customer WHERE username=? AND email=? AND customer_pin=?";
        try (Connection conn = DBConfig.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, username);
            ps.setString(2, email);
            ps.setString(3, pin);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}


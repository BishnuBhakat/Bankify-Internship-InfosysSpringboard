package org.example.service;

import org.example.Models.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    boolean createCustomer(Customer customer) throws Exception;
    boolean updateCustomer(String phone_number, Customer customer) throws Exception;
    boolean deleteCustomer(String phone_number) throws Exception;
    Customer getCustomerByNumber(String phone_number) throws Exception;
    List<Customer> getAllCustomers() throws Exception;
    boolean login(String username,String email,String pin) throws Exception;
}

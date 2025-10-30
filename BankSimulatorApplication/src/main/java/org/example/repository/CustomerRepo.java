package org.example.repository;

import org.example.Models.Customer;

import java.util.List;


public interface CustomerRepo {
   boolean createCustomer(Customer customer) throws Exception;
   boolean updateCustomer(String phone_number,Customer customer) throws Exception;
   boolean deleteCustomer(String phone_number) throws Exception;
   Customer getCustomerByNumber(String phone_number) throws Exception;
   List<Customer> getAllCustomers() throws Exception;
   boolean existsByPhoneNumber(String phoneNumber) throws Exception;
   boolean existsByAadhar(String aadharNumber) throws Exception;
   boolean verifyLogin(String username, String email, String pin) throws Exception;
}

package org.example.service;

import org.example.Models.Customer;
import org.example.repository.CustomerRepo;
import org.example.repository.CustomerRepoImpl;
import org.example.validations.CustomerValidation;

import java.util.List;


public class CustomerServiceImpl implements CustomerService {
private final CustomerRepo customerRepo=new CustomerRepoImpl();


    @Override
    public boolean createCustomer(Customer customer) throws Exception{
        CustomerValidation.validate(customer);
        return customerRepo.createCustomer(customer);
    }

    @Override
    public boolean updateCustomer(String phone_number, Customer customer) throws Exception {
        CustomerValidation.validate(customer);
        return customerRepo.updateCustomer(phone_number,customer);
    }

    @Override
    public boolean deleteCustomer(String phone_number) throws Exception {
       return  customerRepo.deleteCustomer(phone_number);
    }

    @Override
    public Customer getCustomerByNumber(String phone_number) throws Exception {
        return customerRepo.getCustomerByNumber(phone_number);
    }

    @Override
    public List<Customer> getAllCustomers() throws Exception{
        return customerRepo.getAllCustomers();
    }

    @Override
    public boolean login(String username, String email, String pin) throws Exception {
        return customerRepo.verifyLogin( username, email, pin);
    }
}

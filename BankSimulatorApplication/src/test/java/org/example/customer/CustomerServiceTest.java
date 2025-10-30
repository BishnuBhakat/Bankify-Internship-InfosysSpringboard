package org.example.customer;

import org.example.Models.Customer;
import org.example.repository.CustomerRepo;

import org.example.service.CustomerServiceImpl;
import org.example.validations.CustomerValidation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CustomerServiceTest {
    private CustomerRepo customerRepo;
    private CustomerServiceImpl service;

    private Customer createValidCustomer() {
        Customer customer = new Customer();
        customer.setCustomer_id(1);
        customer.setUsername("Bishnu");
        customer.setPhone_number("9876543210");
        customer.setEmail("bishnu1@example.com");
        customer.setCustomer_pin("123456");
        customer.setAddress("howrah,WestBengal");
        customer.setDob("2025-10-07");
        customer.setAadhar_number("123412341234");
        customer.setCustomer_status(Customer.status.ACTIVE);
        return customer;
    }

    @BeforeEach
    void setUp() {
        customerRepo = mock(CustomerRepo.class);
        service = new CustomerServiceImpl() {
            @Override
            public boolean createCustomer(Customer customer) throws Exception {
                CustomerValidation.validate(customer);
                return customerRepo.createCustomer(customer);
            }

            @Override
            public boolean updateCustomer(String phone_number, Customer customer) throws Exception {
                CustomerValidation.validate(customer);
                return customerRepo.updateCustomer(phone_number, customer);
            }
            @Override
            public boolean deleteCustomer(String phone_number) throws Exception {
                return customerRepo.deleteCustomer(phone_number);
            }
            @Override
            public Customer getCustomerByNumber(String phone_number) throws Exception {
                return customerRepo.getCustomerByNumber(phone_number);
            }
            @Override
            public List<Customer> getAllCustomers() throws Exception {
                return customerRepo.getAllCustomers();
            }
        };
    }
    @Test
    void testCreateCustomerSuccess() throws Exception{
        Customer customer=createValidCustomer();
        when(customerRepo.createCustomer(customer)).thenReturn(true);
        boolean result=service.createCustomer(customer);
        assertTrue(result);
        verify(customerRepo,times(1)).createCustomer(customer);
    }
    @Test
    void testCreateCustomerValidationFailure(){
        Customer customer =createValidCustomer();
        customer.setAadhar_number("1234567");//invalid aadhar number
        Exception exception=assertThrows(Exception.class,()-> service.createCustomer(customer));
        assertEquals("Aadhar number must be exactly 12 digits",exception.getMessage());
    }
    @Test
    void testUpdateCustomerSuccess() throws Exception{
        Customer customer=createValidCustomer();
        when(customerRepo.updateCustomer("9876543210",customer)).thenReturn(true);
        boolean result=service.updateCustomer("9876543210",customer);
        assertTrue(result);
        verify(customerRepo,times(1)).updateCustomer("9876543210",customer);
    }
    @Test
    void testDeleteCustomerSuccess() throws Exception{
        when(customerRepo.deleteCustomer("9876543210")).thenReturn(true);
        boolean result=service.deleteCustomer("9876543210");
        assertTrue(result);
        verify(customerRepo,times(1)).deleteCustomer("9876543210");
    }
    @Test
    void testGetCustomerByNumberSuccess() throws Exception{
        Customer customer=createValidCustomer();
        when(customerRepo.getCustomerByNumber("9876543210")).thenReturn(customer);
        Customer result=service.getCustomerByNumber("9876543210");
        assertNotNull(result);
        assertEquals("Bishnu",result.getUsername());
        verify(customerRepo,times(1)).getCustomerByNumber("9876543210");
    }
    @Test
    void testGetAllCustomersSuccess() throws Exception{
        List<Customer> customers=List.of(createValidCustomer());
        when(customerRepo.getAllCustomers()).thenReturn(customers);
        List<Customer> result=service.getAllCustomers();
        assertEquals(1,result.size());
        verify(customerRepo,times(1)).getAllCustomers();
    }
}

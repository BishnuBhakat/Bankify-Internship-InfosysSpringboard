package org.example.customer;

import org.example.Models.Customer;
import org.example.validations.CustomerValidation;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class CustomerValidationTest {
    private Customer createValidCustomer(){
        Customer customer=new Customer();
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
    @Test
    void testValidCustomer(){
        Customer customer=createValidCustomer();
        assertDoesNotThrow(() -> CustomerValidation.validate(customer));
    }
    @Test
    void testInvalidUsername(){
        Customer customer=createValidCustomer();
        customer.setUsername("Bishnu123");//invalid username
        Exception exception=assertThrows(Exception.class,()-> CustomerValidation.validate(customer));
        assertEquals("Username must contain only alphabets",exception.getMessage());
    }
    @Test
    void testInvalidPhoneNumber(){
        Customer customer=createValidCustomer();
        customer.setPhone_number("123456");//invalid phone number
        Exception exception=assertThrows(Exception.class,()-> CustomerValidation.validate(customer));
        assertEquals("Phone number must be 10 digits and start with 6-9",exception.getMessage());
    }
    @Test
    void testInvalidEmail(){
        Customer customer=createValidCustomer();
        customer.setEmail("bishnu1example.com");//invalid email format
        Exception exception=assertThrows(Exception.class,()-> CustomerValidation.validate(customer));
        assertEquals("Invalid email format",exception.getMessage());
    }
    @Test
    void testInvalidCustomerPin(){
        Customer customer=createValidCustomer();
        customer.setCustomer_pin("1234");//invalid pin length
        Exception exception=assertThrows(Exception.class,()-> CustomerValidation.validate(customer));
        assertEquals("Customer PIN must be 6 digits",exception.getMessage());
    }
    @Test
    void testInvalidAddress(){
        Customer customer=createValidCustomer();
        customer.setAddress("");//blank address
        Exception exception=assertThrows(Exception.class,()-> CustomerValidation.validate(customer));
        assertEquals("Address cannot be null or blank",exception.getMessage());
    }
    @Test
    void testNullDob(){
        Customer customer=createValidCustomer();
        customer.setDob(null);//null dob
        Exception exception=assertThrows(Exception.class,()-> CustomerValidation.validate(customer));
        assertEquals("Date of birth cannot be null",exception.getMessage());
    }
    @Test
    void testInvalidAadharNumber() {
        Customer customer = createValidCustomer();
        customer.setAadhar_number("1234578 ");//invalid aadhar number length
        Exception exception = assertThrows(Exception.class, () -> CustomerValidation.validate(customer));
        assertEquals("Aadhar number must be exactly 12 digits", exception.getMessage());
    }
    @Test
    void testNullStatus() {
        Customer customer = createValidCustomer();
        customer.setCustomer_status(null);//null status
        Exception exception = assertThrows(Exception.class, () -> CustomerValidation.validate(customer));
        assertEquals("Status cannot be null", exception.getMessage());
    }
}

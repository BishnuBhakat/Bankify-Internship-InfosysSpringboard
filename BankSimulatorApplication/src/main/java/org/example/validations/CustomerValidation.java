package org.example.validations;

import org.example.Models.Customer;

public class CustomerValidation {
    public static void validate(Customer customer) throws Exception {
        if (customer.getUsername() == null || customer.getUsername().isBlank()) {
            throw new Exception("Username cannot be null or blank");
        }
        if (!customer.getUsername().matches("^[A-Za-z]+$")) {
            throw new Exception("Username must contain only alphabets");
        }

        if (customer.getPhone_number() == null || !customer.getPhone_number().matches("^[6-9][0-9]{9}$")) {
            throw new Exception("Phone number must be 10 digits and start with 6-9");
        }

        if (customer.getAadhar_number() == null || !customer.getAadhar_number().matches("^[0-9]{12}$")) {
            throw new Exception("Aadhar number must be exactly 12 digits");
        }

        if (customer.getEmail() == null || !customer.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new Exception("Invalid email format");
        }

        if (customer.getCustomer_pin() == null || !customer.getCustomer_pin().matches("^[0-9]{6}$")) {
            throw new Exception("Customer PIN must be 6 digits");
        }

        if (customer.getAddress() == null || customer.getAddress().isBlank()) {
            throw new Exception("Address cannot be null or blank");
        }

        if (customer.getDob() == null) {
            throw new Exception("Date of birth cannot be null");
        }

        if (customer.getCustomer_status() == null) {
            throw new Exception("Status cannot be null");
        }
    }
}

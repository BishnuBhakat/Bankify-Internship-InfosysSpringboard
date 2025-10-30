package org.example.account;

import org.example.Models.Account;
import org.example.validations.AccountValidation;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.*;

public class AccountValidationTest {
    private Account createValidAccount() {
        Account account = new Account();
        account.setAccount_id(1);
        account.setCustomer_id(1);
        account.setAadhar_number("123456789012");
        account.setAccount_name("Bishnu Bhakat");
        account.setBalance(1000);
        account.setAccount_type("Savings");
        account.setAccount_number("123456789");
        account.setLinked_phone_number("9876543210");
        account.setBranch("Main Branch");
        account.setIfsc_code("IFSC0001");
        account.setAccount_status(Account.status.ACTIVE);
        return account;
    }
    @Test
    void testValidAccount(){
        Account account = createValidAccount();
        assertDoesNotThrow(()-> AccountValidation.validate(account));
    }

    @Test
    void testInvalidAadharNumber() {
        Account account = createValidAccount();
        account.setAadhar_number("1234567");//invalid aadhar number
        Exception e = assertThrows(Exception.class, () -> AccountValidation.validate(account));
        assertEquals("Aadhar number must be exactly 12 digits", e.getMessage());
    }
    @Test
    void testInvalidBalance() {
        Account account = createValidAccount();
        account.setBalance(100); // less than 500
        Exception e = assertThrows(Exception.class, () -> AccountValidation.validate(account));
        assertEquals("Balance must be greater and cannot be blank", e.getMessage());
    }
    @Test
    void testInvalidAccountNumber() {
        Account account = createValidAccount();
        account.setAccount_number("123");
        Exception e = assertThrows(Exception.class, () -> AccountValidation.validate(account));
        assertEquals("Account number must be between 9 and 18 digits", e.getMessage());
    }
    @Test
    void testInvalidPhoneNumber() {
        Account account = createValidAccount();
        account.setLinked_phone_number("1234567890");
        Exception e = assertThrows(Exception.class, () -> AccountValidation.validate(account));
        assertEquals("Linked phone number must be 10 digits and start with 6-9", e.getMessage());
    }
    @Test
    void testNullBranch() {
        Account account = createValidAccount();
        account.setBranch(null);
        Exception e = assertThrows(Exception.class, () -> AccountValidation.validate(account));
        assertEquals("Branch cannot be null or blank", e.getMessage());
    }
    @Test
    void testNullIfscCode() {
        Account account = createValidAccount();
        account.setIfsc_code("");
        Exception e = assertThrows(Exception.class, () -> AccountValidation.validate(account));
        assertEquals("IFSC code cannot be null or blank.Provide a valid IFSC code", e.getMessage());
    }
    @Test
    void testNullStatus() {
        Account account = createValidAccount();
        account.setAccount_status(null);
        Exception e = assertThrows(Exception.class, () -> AccountValidation.validate(account));
        assertEquals("Status cannot be null", e.getMessage());
    }
}

package org.example.account;

import org.example.Models.Account;
import org.example.repository.AccountRepo;
import org.example.service.AccountServiceImpl;
import org.example.validations.AccountValidation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AccountServiceTest {
    private AccountRepo accountRepo;
    private AccountServiceImpl service;

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

    @BeforeEach
    void setUp() {
        accountRepo = mock(AccountRepo.class);
        service = new AccountServiceImpl() {
            @Override
            public boolean createAccount(Account account) throws Exception {
                AccountValidation.validate(account);
                if (!accountRepo.existsById(account.getCustomer_id()))
                    throw new IllegalAccessException("Customer id not exists");
                if (!accountRepo.exitsByAadharNumber(account.getAadhar_number()))
                    throw new IllegalAccessException("Aadhar number not exists");
                return accountRepo.createAccount(account);
            }
            @Override
            public boolean updateAccount(String accNo, Account account) throws Exception {
                AccountValidation.validate(account);
                if (!accountRepo.existsById(account.getCustomer_id()))
                    throw new IllegalAccessException("Customer id not exists");
                if (!accountRepo.exitsByAadharNumber(account.getAadhar_number()))
                    throw new IllegalAccessException("Aadhar number not exists");
                return accountRepo.updateAccount(accNo, account);
            }
            @Override
            public boolean deleteAccount(String accNo) throws Exception {
                return accountRepo.deleteAccount(accNo);
            }
            @Override
            public Account getAccountByAccountNumber(String accNo) throws Exception {
                return accountRepo.getAccountByAccountNumber(accNo);
            }

            @Override
            public List<Account> getAllAccounts() throws Exception {
                return accountRepo.getAllAccounts();
            }
        };
    }
    @Test
    void testCreateAccountSuccess() throws Exception {
        Account account = createValidAccount();
        when(accountRepo.existsById(account.getCustomer_id())).thenReturn(true);
        when(accountRepo.exitsByAadharNumber(account.getAadhar_number())).thenReturn(true);
        when(accountRepo.createAccount(account)).thenReturn(true);

        boolean result = service.createAccount(account);
        assertTrue(result);
        verify(accountRepo, times(1)).createAccount(account);
    }
    @Test
    void testCreateAccountCustomerIdNotExists() throws Exception {
        Account account = createValidAccount();
        when(accountRepo.existsById(account.getCustomer_id())).thenReturn(false);
        when(accountRepo.exitsByAadharNumber(account.getAadhar_number())).thenReturn(true);

        Exception e = assertThrows(IllegalAccessException.class, () -> service.createAccount(account));
        assertEquals("Customer id not exists", e.getMessage());
    }

    @Test
    void testCreateAccountAadharNotExists() throws Exception {
        Account account = createValidAccount();
        when(accountRepo.existsById(account.getCustomer_id())).thenReturn(true);
        when(accountRepo.exitsByAadharNumber(account.getAadhar_number())).thenReturn(false);

        Exception e = assertThrows(IllegalAccessException.class, () -> service.createAccount(account));
        assertEquals("Aadhar number not exists", e.getMessage());
    }

    @Test
    void testUpdateAccountSuccess() throws Exception {
        Account account = createValidAccount();
        when(accountRepo.existsById(account.getCustomer_id())).thenReturn(true);
        when(accountRepo.exitsByAadharNumber(account.getAadhar_number())).thenReturn(true);
        when(accountRepo.updateAccount(account.getAccount_number(), account)).thenReturn(true);

        boolean result = service.updateAccount(account.getAccount_number(), account);
        assertTrue(result);
    }

    @Test
    void testDeleteAccount() throws Exception {
        when(accountRepo.deleteAccount("123456789012345")).thenReturn(true);
        boolean result = service.deleteAccount("123456789012345");
        assertTrue(result);
        verify(accountRepo, times(1)).deleteAccount("123456789012345");
    }

    @Test
    void testGetAccountByAccountNumber() throws Exception {
        Account account = createValidAccount();
        when(accountRepo.getAccountByAccountNumber("123456789012345")).thenReturn(account);

        Account result = service.getAccountByAccountNumber("123456789012345");
        assertNotNull(result);
        assertEquals("Bishnu Bhakat", result.getAccount_name());
    }

    @Test
    void testGetAllAccounts() throws Exception {
        List<Account> accounts = List.of(createValidAccount());
        when(accountRepo.getAllAccounts()).thenReturn(accounts);

        List<Account> result = service.getAllAccounts();
        assertEquals(1, result.size());
    }
}

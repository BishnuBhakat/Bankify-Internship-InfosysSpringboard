package org.example.service;

import org.example.Models.Account;
import org.example.Models.Customer;
import org.example.Models.Transaction;
import org.example.repository.AccountRepo;
import org.example.repository.CustomerRepo;
import org.example.repository.TransactionRepo;

import java.util.List;

public class AdminServiceImpl implements AdminService{
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PIN = "123456";
    private static final String ADMIN_EMAIL="admin123@example.com";

    private final CustomerRepo customerRepo;
    private final AccountRepo accountRepo;
    private final TransactionRepo transactionRepo;
    public AdminServiceImpl(CustomerRepo customerRepo, AccountRepo  accountRepo, TransactionRepo transactionRepo) {
        this.transactionRepo = transactionRepo;
        this.accountRepo = accountRepo;
        this.customerRepo = customerRepo;
    }
    @Override
    public boolean login(String username, String pin,String email) {
        return ADMIN_USERNAME.equals(username) &&
                ADMIN_PIN.equals(pin) &&
                ADMIN_EMAIL.equals(email);
    }

    @Override
    public List<Customer> getAllCustomers() throws Exception {
        return customerRepo.getAllCustomers();
    }

    @Override
    public List<Account> getAllAccounts() throws Exception {
        return accountRepo.getAllAccounts();
    }

    @Override
    public List<Transaction> getAllTransactions() throws Exception {
            return transactionRepo.getAllTransactions();
    }
}

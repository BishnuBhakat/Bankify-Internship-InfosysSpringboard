package org.example.service;

import org.example.Models.Account;
import org.example.Models.Customer;
import org.example.Models.Transaction;

import java.util.List;

public interface AdminService {
    boolean   login(String username, String pin,String email) ;
    List<Customer> getAllCustomers() throws Exception;
    List<Account> getAllAccounts() throws Exception;
    List<Transaction> getAllTransactions() throws Exception;
}

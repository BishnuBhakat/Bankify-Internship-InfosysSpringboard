package org.example.repository;

import org.example.Models.Account;

import java.util.List;

public interface AccountRepo {
    boolean createAccount(Account account) throws Exception;
    boolean updateAccount(String account_number,Account account) throws Exception;


    boolean deleteAccount(String account_number) throws Exception;

    Account getAccountByAccountNumber(String accountNumber) throws Exception;
    List<Account> getAllAccounts() throws Exception;

    boolean existsById(int customer_id) throws Exception;//from customer table
    boolean existsByAccountNumber(String account_number) throws Exception;
    boolean exitsByAadharNumber(String aadhar_number) throws Exception;// from customer table
}

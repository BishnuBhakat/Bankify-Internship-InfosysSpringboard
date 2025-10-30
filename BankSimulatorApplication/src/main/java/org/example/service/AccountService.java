package org.example.service;

import org.example.Models.Account;

import java.util.List;

public interface AccountService {
    boolean createAccount(Account account) throws Exception;
    boolean updateAccount(String account_number, Account account) throws Exception;
    boolean deleteAccount(String account_number) throws Exception;

    Account getAccountByAccountNumber(String accountNumber) throws Exception;
    List<Account> getAllAccounts() throws Exception;
}

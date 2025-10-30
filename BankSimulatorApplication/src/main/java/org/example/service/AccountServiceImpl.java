package org.example.service;

import org.example.Models.Account;
import org.example.repository.AccountRepo;
import org.example.repository.AccountRepoImpl;
import org.example.validations.AccountValidation;

import java.util.List;

public class AccountServiceImpl implements  AccountService{
    private final AccountRepo accountRepo=new AccountRepoImpl();
    @Override
    public boolean createAccount(Account account) throws Exception {
        AccountValidation.validate(account);
//        if(!accountRepo.existsById(account.getCustomer_id())){
//            throw new IllegalAccessException("Customer id not exists");
//        }
//        if(!accountRepo.exitsByAadharNumber(account.getAadhar_number())){
//            throw new IllegalAccessException("Aadhar number not exists");
//        }
        return accountRepo.createAccount(account);
    }
    @Override
    public boolean updateAccount(String account_number, Account account) throws Exception {
        AccountValidation.validate(account);
//        if(!accountRepo.existsById(account.getCustomer_id())){
//            throw new IllegalAccessException("Customer id not exists");
//        }
//        if(!accountRepo.exitsByAadharNumber(account.getAadhar_number())){
//            throw new IllegalAccessException("Aadhar number not exists");
//        }
        return accountRepo.updateAccount(account_number,account);
    }
    @Override
    public boolean deleteAccount(String account_number) throws Exception {
        return accountRepo.deleteAccount(account_number);
    }
    @Override
    public Account getAccountByAccountNumber(String accountNumber) throws Exception {
        return accountRepo.getAccountByAccountNumber(accountNumber);
    }
    @Override
    public List<Account> getAllAccounts() throws Exception {
       return accountRepo.getAllAccounts();
    }
}

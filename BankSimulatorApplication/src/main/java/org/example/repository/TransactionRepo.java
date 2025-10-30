package org.example.repository;

import org.example.Models.Transaction;

import java.util.List;

public interface TransactionRepo {
    boolean createTransaction(Transaction transaction) throws Exception;
    List<Transaction> getTransactionsByAccountNumber(String accountNumber) throws Exception;
    List<Transaction> getAllTransactions() throws Exception;
    boolean matchPin(String account_number,String pin) throws Exception;
    boolean checkAccountExists(String accountNumber) throws Exception;
    double getAccountBalance(String accountNumber) throws Exception;
    boolean updateAccountBalance(String accountNumber, double newBalance) throws Exception;
    //email
    String getEmailByAccountNumber(String accountNumber) throws Exception;
}

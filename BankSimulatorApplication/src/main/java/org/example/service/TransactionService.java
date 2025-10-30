package org.example.service;

import org.example.Models.Transaction;

import java.util.List;

public interface TransactionService {
    boolean createTransaction(Transaction transaction) throws Exception;
    List<Transaction> getTransactionsByAccountNumber(String accountNumber) throws Exception;
    List<Transaction> getAllTransactions() throws Exception;
}

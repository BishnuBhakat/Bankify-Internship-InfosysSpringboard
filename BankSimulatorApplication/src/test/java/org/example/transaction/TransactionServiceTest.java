package org.example.transaction;

import org.example.Models.Transaction;
import org.example.repository.TransactionRepo;
import org.example.service.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TransactionServiceTest {

    private TransactionRepo transactionRepo;
    private TransactionServiceImpl service;

    private Transaction createValidTransaction() {;
        Transaction transaction = new Transaction();
        transaction.setTransaction_id(1);
        transaction.setAccount_id(1);
        transaction.setTransaction_amount(1000);
        transaction.setSender_account_number("123456789");
        transaction.setReceiver_account_number("987654321");
        transaction.setMode("ONLINE");
        transaction.setDescription("Payment test");
        return transaction;
    }

    @BeforeEach
    void setUp() {
        transactionRepo=mock(TransactionRepo.class);
        service=new TransactionServiceImpl() {
            @Override
            public boolean createTransaction(Transaction transaction) throws Exception {
                if (transaction.getTransaction_amount() <= 0) {
                    throw new Exception("Transaction amount must be greater than zero");
                }
                if (transaction.getSender_account_number().equals(transaction.getReceiver_account_number())) {
                    throw new Exception("Sender and receiver account numbers cannot be the same");
                }
                if (!transactionRepo.checkAccountExists(transaction.getSender_account_number())) {
                    throw new Exception("Sender account not found");
                }
                if (!transactionRepo.checkAccountExists(transaction.getReceiver_account_number())) {
                    throw new Exception("Receiver account not found");
                }
                double senderBalance = transactionRepo.getAccountBalance(transaction.getSender_account_number());
                if (senderBalance < transaction.getTransaction_amount()) {
                    throw new Exception("insufficient balance");
                }
                double receiverBalance = transactionRepo.getAccountBalance(transaction.getReceiver_account_number());
                boolean senderUpdate = transactionRepo.updateAccountBalance(
                        transaction.getSender_account_number(),
                        senderBalance - transaction.getTransaction_amount());
                boolean receiverUpdate = transactionRepo.updateAccountBalance(
                        transaction.getReceiver_account_number(),
                        receiverBalance + transaction.getTransaction_amount());
                if (!senderUpdate || !receiverUpdate) {
                    throw new Exception("Failed to update account balances");
                }
                return transactionRepo.createTransaction(transaction);
            }

            public List<Transaction> getTransactionsByAccountNumber(String accountNumber) throws Exception {
                return transactionRepo.getTransactionsByAccountNumber(accountNumber);
            }
        };
    }
        @Test
        void testCreateTransactionSuccess () throws Exception {
        Transaction transaction=createValidTransaction();
            when(transactionRepo.checkAccountExists("123456789")).thenReturn(true);
            when(transactionRepo.checkAccountExists("987654321")).thenReturn(true);
            when(transactionRepo.getAccountBalance("123456789")).thenReturn(5000.0);
            when(transactionRepo.getAccountBalance("987654321")).thenReturn(2000.0);
            when(transactionRepo.updateAccountBalance("123456789", 4000.0)).thenReturn(true);
            when(transactionRepo.updateAccountBalance("987654321", 3000.0)).thenReturn(true);
            when(transactionRepo.createTransaction(transaction)).thenReturn(true);
            boolean result = service.createTransaction(transaction);
            assertTrue(result);
            verify(transactionRepo, times(1)).createTransaction(transaction);
        }
        @Test
        void testCreateTransactionSenderAccountNotFound () throws Exception {
            Transaction transaction=createValidTransaction();
            when(transactionRepo.checkAccountExists("123456789")).thenReturn(false);
            Exception exception = assertThrows(Exception.class,
                    () -> service.createTransaction(transaction));
            assertEquals("Sender account not found", exception.getMessage());
        }
        @Test
        void testCreateTransactionReceiverAccountNotFound () throws Exception {
            Transaction transaction=createValidTransaction();
            when(transactionRepo.checkAccountExists("123456789")).thenReturn(true);
            when(transactionRepo.checkAccountExists("987654321")).thenReturn(false);
            Exception exception = assertThrows(Exception.class,
                    () -> service.createTransaction(transaction));
            assertEquals("Receiver account not found", exception.getMessage());
        }
        @Test
        void testCreateTransactionInsufficientBalance () throws Exception {
            Transaction transaction=createValidTransaction();
            when(transactionRepo.checkAccountExists("123456789")).thenReturn(true);
            when(transactionRepo.checkAccountExists("987654321")).thenReturn(true);
            when(transactionRepo.getAccountBalance("123456789")).thenReturn(500.0); // less than 1000
            Exception exception = assertThrows(Exception.class,
                    () -> service.createTransaction(transaction));
            assertEquals("insufficient balance", exception.getMessage());
        }
//
        @Test
        void testCreateTransactionBalanceUpdateFails () throws Exception {
        Transaction transaction=createValidTransaction();
            when(transactionRepo.checkAccountExists("123456789")).thenReturn(true);
            when(transactionRepo.checkAccountExists("987654321")).thenReturn(true);
            when(transactionRepo.getAccountBalance("123456789")).thenReturn(5000.0);
            when(transactionRepo.getAccountBalance("987654321")).thenReturn(2000.0);
            when(transactionRepo.updateAccountBalance("123456789", 4000.0)).thenReturn(false);
            Exception exception = assertThrows(Exception.class,
                    () -> service.createTransaction(transaction));
            assertEquals("Failed to update account balances", exception.getMessage());
        }

        @Test
        void testGetTransactionsByAccountNumber () throws Exception {
        Transaction transaction=createValidTransaction();
            when(transactionRepo.getTransactionsByAccountNumber("123456789"))
                    .thenReturn(List.of(transaction));
            List<Transaction> result = service.getTransactionsByAccountNumber("123456789");
            assertNotNull(result);
            assertEquals(1, result.size());
            assertEquals("987654321", result.get(0).getReceiver_account_number());
            verify(transactionRepo, times(1)).getTransactionsByAccountNumber("123456789");
        }

        @Test
        void testCreateTransactionInvalidAmount () {
        Transaction transaction=createValidTransaction();
            transaction.setTransaction_amount(-100);
            Exception exception = assertThrows(Exception.class,
                    () -> service.createTransaction(transaction));
            assertTrue(exception.getMessage().contains("greater than zero"));
        }
        @Test
        void testCreateTransactionSameSenderReceiver () {
        Transaction transaction=createValidTransaction();
            transaction.setReceiver_account_number("123456789");
            transaction.setSender_account_number("123456789");
            Exception exception = assertThrows(Exception.class,
                    () -> service.createTransaction(transaction));
            assertTrue(exception.getMessage().contains("cannot be the same"));
        }
    }


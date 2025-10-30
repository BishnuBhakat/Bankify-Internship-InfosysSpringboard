package org.example.service;

import org.example.Models.Transaction;
import org.example.repository.TransactionRepo;
import org.example.repository.TransactionRepoImpl;
import org.example.validations.TransactionValidation;

import java.util.List;

public class TransactionServiceImpl implements TransactionService{
    private final TransactionRepo transactionRepo=new TransactionRepoImpl();
    private final EmailService emailService=new EmailService();
    @Override
    public boolean createTransaction(Transaction transaction) throws Exception {
        TransactionValidation.validate(transaction);
        if(!transactionRepo.checkAccountExists(transaction.getSender_account_number())){
            throw new Exception("Sender account not found");
        }
        if(!transactionRepo.checkAccountExists(transaction.getReceiver_account_number())){
            throw new Exception("Receiver account not found");
        }
        boolean isPinMatched = transactionRepo.matchPin(
                transaction.getSender_account_number(),
                transaction.getPin());

        if (!isPinMatched) {
            throw new Exception("Invalid customer PIN");
        }
        double senderBalance=transactionRepo.getAccountBalance(transaction.getSender_account_number());
        double receiverBalance=transactionRepo.getAccountBalance(transaction.getReceiver_account_number());
        if(senderBalance< transaction.getTransaction_amount()){
            throw new Exception("insufficient balance");
        }
        double newSenderBalance=senderBalance- transaction.getTransaction_amount();
        double newReceiverBalance=receiverBalance+ transaction.getTransaction_amount();
        boolean senderUpdated=transactionRepo.updateAccountBalance(transaction.getSender_account_number(),newSenderBalance);
        boolean receiverUpdated=transactionRepo.updateAccountBalance(transaction.getReceiver_account_number(),newReceiverBalance);
        if(!senderUpdated || !receiverUpdated){
            throw new Exception("Failed to update account balances");
        }
        boolean isTransactionCreated=transactionRepo.createTransaction(transaction);
        if(isTransactionCreated){
            String senderEmail=transactionRepo.getEmailByAccountNumber(transaction.getSender_account_number());
            String receiverEmail=transactionRepo.getEmailByAccountNumber(transaction.getReceiver_account_number());
            emailService.sendEmail(senderEmail,
                    "Debit Transaction notification",
                    "Rs."+ transaction.getTransaction_amount()+" debited from your account "+ transaction.getSender_account_number()+
                            ". New balance: "+newSenderBalance);
            emailService.sendEmail(receiverEmail,
                    "Credit Transaction notification",
                    "Rs."+ transaction.getTransaction_amount()+" credited to your account "+ transaction.getReceiver_account_number()+
                            ". New balance: "+newReceiverBalance);
        }
        return isTransactionCreated;
    }

    @Override
    public List<Transaction> getTransactionsByAccountNumber(String accountNumber) throws Exception {
       return transactionRepo.getTransactionsByAccountNumber(accountNumber);
    }

    @Override
    public List<Transaction> getAllTransactions() throws Exception {
        return transactionRepo.getAllTransactions();
    }
}

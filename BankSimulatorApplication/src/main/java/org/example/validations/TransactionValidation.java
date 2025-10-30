package org.example.validations;

import org.example.Models.Transaction;

public class TransactionValidation {
public static void validate(Transaction transaction) throws Exception {

    if (transaction.getTransaction_amount() <= 0) {
        throw new Exception("Transaction amount must be greater than zero.");
    }

    if (transaction.getSender_account_number() == null ||
            !transaction.getSender_account_number().matches("^[0-9]{9,18}$")) {
        throw new Exception("Sender account number must be between 9 and 18 digits.");
    }

    if (transaction.getReceiver_account_number() == null ||
            !transaction.getReceiver_account_number().matches("^[0-9]{9,18}$")) {
        throw new Exception("Receiver account number must be between 9 and 18 digits.");
    }

    if (transaction.getSender_account_number().equals(transaction.getReceiver_account_number())) {
        throw new Exception("Sender and receiver account numbers cannot be the same.");
    }

    if (transaction.getMode() == null || transaction.getMode().isBlank()) {
        throw new Exception("Transaction mode cannot be null or blank. Example:ONLINE.");
    }

    if (transaction.getDescription() != null && transaction.getDescription().length() > 255) {
        throw new Exception("Description cannot exceed 255 characters.");
    }
    if (transaction.getPin() == null || !transaction.getPin().matches("^[0-9]{6}$")) {
        throw new Exception("Customer PIN must be 6 digits");
    }
}
}

package org.example.transaction;
import org.example.Models.Transaction;
import org.example.validations.TransactionValidation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
public class TransactionValidationTest {

        @Test
        void testValidTransaction() {
            Transaction transaction = new Transaction();
            transaction.setTransaction_amount(1000);
            transaction.setSender_account_number("123456789");
            transaction.setReceiver_account_number("987654321");
            transaction.setMode("ONLINE");
            transaction.setDescription("Payment for invoice");
            assertDoesNotThrow(() -> TransactionValidation.validate(transaction));
        }

        @Test
        void testInvalidAmount() {
            Transaction transaction = new Transaction();
            transaction.setTransaction_amount(0);//invalid amount zero
            transaction.setSender_account_number("123456789");
            transaction.setReceiver_account_number("987654321");
            transaction.setMode("ONLINE");
            Exception exception = assertThrows(Exception.class, () -> TransactionValidation.validate(transaction));
            assertEquals("Transaction amount must be greater than zero.", exception.getMessage());
        }

        @Test
        void testNullSenderAccount() {
            Transaction transaction = new Transaction();
            transaction.setTransaction_amount(1000);
            transaction.setSender_account_number(null);//sender accnt null
            transaction.setReceiver_account_number("987654321");
            transaction.setMode("ONLINE");
            Exception exception = assertThrows(Exception.class, () -> TransactionValidation.validate(transaction));
            assertEquals("Sender account number must be between 9 and 18 digits.", exception.getMessage());
        }

        @Test
        void testInvalidReceiverAccount() {
            Transaction transaction = new Transaction();
            transaction.setTransaction_amount(1000);
            transaction.setSender_account_number("123456789");
            transaction.setReceiver_account_number("12"); // accnt number too short
            transaction.setMode("ONLINE");
            Exception exception = assertThrows(Exception.class, () -> TransactionValidation.validate(transaction));
            assertEquals("Receiver account number must be between 9 and 18 digits.", exception.getMessage());
        }

        @Test
        void testSameAccountNumbers() {
            Transaction transaction = new Transaction();
            transaction.setTransaction_amount(1000);
            transaction.setSender_account_number("123456789");//sender accnt number
            transaction.setReceiver_account_number("123456789");//same accnt number
            transaction.setMode("ONLINE");
            Exception exception = assertThrows(Exception.class, () -> TransactionValidation.validate(transaction));
            assertEquals("Sender and receiver account numbers cannot be the same.", exception.getMessage());
        }

        @Test
        void testBlankMode() {
            Transaction transaction = new Transaction();
            transaction.setTransaction_amount(1000);
            transaction.setSender_account_number("123456789");
            transaction.setReceiver_account_number("987654321");
            transaction.setMode(" "); // mode blank
            Exception exception = assertThrows(Exception.class, () -> TransactionValidation.validate(transaction));
            assertEquals("Transaction mode cannot be null or blank. Example:ONLINE.", exception.getMessage());
        }

        @Test
        void testLongDescription() {
            Transaction transaction = new Transaction();
            transaction.setTransaction_amount(1000);
            transaction.setSender_account_number("123456789");
            transaction.setReceiver_account_number("987654321");
            transaction.setMode("ONLINE");
            transaction.setDescription("A".repeat(260)); // length of desc-260 characters
            Exception exception = assertThrows(Exception.class, () -> TransactionValidation.validate(transaction));
            assertEquals("Description cannot exceed 255 characters.", exception.getMessage());
        }
    }


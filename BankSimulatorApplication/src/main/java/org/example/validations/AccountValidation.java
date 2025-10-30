package org.example.validations;

import org.example.Models.Account;

public class AccountValidation {
    public static void validate(Account account) throws Exception {

        if (account.getAccount_name() == null || account.getAccount_name().isBlank()) {
            throw new Exception("Account name cannot be null or blank");
        }
        if (account.getBalance() < 500 || String.valueOf(account.getBalance()).isBlank()) {
            throw new Exception("Balance must be greater and cannot be blank");
        }
        if (account.getAccount_type() == null || account.getAccount_type().isBlank()) {
            throw new Exception("Account type cannot be null or blank . Eg: Savings, Current");
        }
        if (account.getAccount_number() == null || !account.getAccount_number().matches("^[0-9]{9,18}$")) {
            throw new Exception("Account number must be between 9 and 18 digits");
        }
        if (account.getLinked_phone_number() == null || !account.getLinked_phone_number().matches("^[6-9][0-9]{9}$")) {
            throw new Exception("Linked phone number must be 10 digits and start with 6-9");
        }
        if (account.getBranch() == null || account.getBranch().isBlank()) {
            throw new Exception("Branch cannot be null or blank");
        }
        if(account.getIfsc_code()==null || account.getIfsc_code().isBlank()){
            throw new Exception("IFSC code cannot be null or blank.Provide a valid IFSC code");
        }
        if(account.getAccount_status()==null){
            throw new Exception("Status cannot be null");
        }
    }
}

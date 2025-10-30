package org.example.Models;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Timestamp;
import java.time.LocalDateTime;


public class Transaction {

    private int transaction_id;
    private int account_id;
    private double transaction_amount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp transaction_date;
    private String sender_account_number;
    private String receiver_account_number;
    private String mode;
    private String description;
    private String pin;

    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public double getTransaction_amount() {
        return transaction_amount;
    }

    public void setTransaction_amount(double transaction_amount) {
        this.transaction_amount = transaction_amount;
    }

    public Timestamp getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(Timestamp transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getSender_account_number() {
        return sender_account_number;
    }

    public void setSender_account_number(String sender_account_number) {
        this.sender_account_number = sender_account_number;
    }

    public String getReceiver_account_number() {
        return receiver_account_number;
    }

    public void setReceiver_account_number(String receiver_account_number) {
        this.receiver_account_number = receiver_account_number;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}

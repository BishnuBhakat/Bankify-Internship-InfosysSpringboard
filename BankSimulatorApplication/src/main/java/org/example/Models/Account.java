package org.example.Models;


import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Timestamp;

public class Account {

    public enum status {
        ACTIVE,
        INACTIVE
    }

    private int account_id;// primary key
    private int customer_id;// foreign key from the customer table
    private String aadhar_number;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp created_at;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp modified_at;

    private String account_name;
    private double balance;
    private String account_type;
    private String account_number;

    private String linked_phone_number;
    private String branch;
    private String ifsc_code;
    private status account_status;

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Timestamp getModified_at() {
        return modified_at;
    }

    public void setModified_at(Timestamp modified_at) {
        this.modified_at = modified_at;
    }

    public String getAccount_name() {
        return account_name;
    }

    public void setAccount_name(String account_name) {
        this.account_name = account_name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getAccount_type() {
        return account_type;
    }

    public void setAccount_type(String account_type) {
        this.account_type = account_type;
    }

    public String getAccount_number() {
        return account_number;
    }

    public void setAccount_number(String account_number) {
        this.account_number = account_number;
    }

    public String getLinked_phone_number() {
        return linked_phone_number;
    }

    public void setLinked_phone_number(String linked_phone_number) {
        this.linked_phone_number = linked_phone_number;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getIfsc_code() {
        return ifsc_code;
    }

    public void setIfsc_code(String ifsc_code) {
        this.ifsc_code = ifsc_code;
    }

    public status getAccount_status() {
        return account_status;
    }

    public void setAccount_status(status account_status) {
        this.account_status = account_status;
    }
    public String getAadhar_number() {
        return aadhar_number;
    }
    public void setAadhar_number(String aadhar_number) {
        this.aadhar_number = aadhar_number;
    }
}

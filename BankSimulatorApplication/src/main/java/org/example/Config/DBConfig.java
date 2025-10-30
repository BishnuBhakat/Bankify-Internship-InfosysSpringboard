package org.example.Config;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConfig {
        private static final String URL = "jdbc:mysql://localhost:3306/bank_simulator";
        private static final String USER = "root";
        private static final String PASSWORD = "Bishnu@2004";

        public static Connection getConnection() {
            Connection conn = null;
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection(URL, USER, PASSWORD);
                System.out.println("Database Connected ");
            } catch (ClassNotFoundException e) {
                System.out.println("JDBC Driver not found");
                e.printStackTrace();
            } catch (SQLException e) {
                System.out.println("Connection Failed");
                e.printStackTrace();
            }
            return conn;
        }
        public static void createTables(){
            try(Connection connection=getConnection();
                Statement statement=connection.createStatement()){
                String createCustomerTable= """
                        CREATE TABLE IF NOT EXISTS Customer(
                        customer_id INT  AUTO_INCREMENT PRIMARY KEY,
                        username VARCHAR(100) NOT NULL UNIQUE,
                        phone_number VARCHAR(10) NOT NULL UNIQUE,
                        email VARCHAR(100) NOT NULL,
                        customer_pin CHAR(6) NOT NULL,
                        address VARCHAR(255) NOT NULL,
                        dob VARCHAR(50) NOT NULL,
                        aadhar_number CHAR(12) NOT NULL UNIQUE,
                        customer_status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE' NOT NULL
                        );
                        """;

                String createAccountTable="""
                        CREATE TABLE IF NOT EXISTS Account(
                            account_id INT AUTO_INCREMENT PRIMARY KEY,
                            customer_id INT NOT NULL,
                            aadhar_number CHAR(12) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            account_name VARCHAR(100) NOT NULL,
                            balance DOUBLE NOT NULL DEFAULT 0,
                            account_type VARCHAR(50) NOT NULL,
                            account_number VARCHAR(18) NOT NULL UNIQUE,
                            linked_phone_number VARCHAR(10) NOT NULL ,
                            branch VARCHAR(100) NOT NULL,
                            ifsc_code VARCHAR(12) NOT NULL,
                            account_status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
                            FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
                        );
                        """;

                String createTransactionTable= """
                        CREATE TABLE IF NOT EXISTS Transaction(
                            transaction_id INT AUTO_INCREMENT PRIMARY KEY,
                            account_id INT NOT NULL,
                            transaction_amount DOUBLE NOT NULL,
                            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            sender_account_number VARCHAR(18) NOT NULL,
                            receiver_account_number VARCHAR(18) NOT NULL,
                            mode VARCHAR(50) NOT NULL,
                            description VARCHAR(255),
                            FOREIGN KEY (account_id) REFERENCES Account(account_id)
                        );
                        """;
                statement.executeUpdate(createCustomerTable);
                System.out.println("Customer Table created successfully");
                statement.executeUpdate(createAccountTable);
                System.out.println("Account Table created successfully");
                statement.execute(createTransactionTable);
                System.out.println(" Transaction Table created successfully");
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }


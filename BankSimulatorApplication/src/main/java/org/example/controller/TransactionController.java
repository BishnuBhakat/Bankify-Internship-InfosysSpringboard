package org.example.controller;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.Models.Transaction;
import org.example.service.DownloadTransactions;
import org.example.service.TransactionService;
import org.example.service.TransactionServiceImpl;
import java.util.List;
@Path("/transaction")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TransactionController {
  private final TransactionService transactionService=new TransactionServiceImpl();
  @POST
  @Path("/create-transaction")
    public Response createTransaction(Transaction transaction){
      try {
          boolean created= transactionService.createTransaction(transaction);
          if(!created){
              return Response.status(Response.Status.BAD_REQUEST).entity("Transaction could not be created").build();
          }
          return Response.ok("Transaction created successfully").build();
      }catch (Exception e){
          return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error creating transaction: " + e.getMessage()).build();
      }
    }
    @GET
    @Path("/get-transaction/{account_number}")
    public Response getTransactionsByAccountNumber(@PathParam("account_number") String accountNumber){
        try {
            List<Transaction> transactions =transactionService.getTransactionsByAccountNumber(accountNumber);
            if(transactions.isEmpty()){
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"message\":\"No transactions found for account number: " + accountNumber + "\"}")
                        .build();
            }
            return Response.ok(transactions).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    @GET//download in Excel format
    @Path("/download-transactions/{account_number}")
    @Produces("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public Response downloadTransactions(@PathParam("account_number") String accountNumber) {
        try {
            List<Transaction> transactions = transactionService.getTransactionsByAccountNumber(accountNumber);

            byte[] excelData = DownloadTransactions.exportTransactions(transactions);

            return Response.ok(excelData)
                    .header("Content-Disposition", "attachment; filename=transactions_" + accountNumber + ".xlsx")
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
//    @GET
//    @Path("/get-transactions")
//    public Response getAllTransactions() {
//        try {
//            List<Transaction> transactions = transactionService.getAllTransactions();
//            return Response.ok(transactions).build();
//        } catch (Exception e) {
//            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
//                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
//                    .build();
//        }
//    }

}

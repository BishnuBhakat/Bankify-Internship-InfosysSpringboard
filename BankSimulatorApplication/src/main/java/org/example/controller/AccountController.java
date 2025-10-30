package org.example.controller;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.Models.Account;
import org.example.service.AccountService;
import org.example.service.AccountServiceImpl;


import java.util.List;


@Path(("/accounts"))
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountController {
    private final AccountService accountService = new AccountServiceImpl();

    @POST
    @Path("/create")
    public Response createAccount(Account account) {
        try {
            boolean created = accountService.createAccount(account);
            if (created) {
                return Response.status(Response.Status.CREATED)
                        .entity("{\"message\":\"Account created successfully\"}")
                        .build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"message\":\"Failed to create account\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    @PUT
    @Path("/update/{account_number}")
    public Response updateAccount(@PathParam("account_number") String account_number, Account account) {
        try {
            boolean updated = accountService.updateAccount(account_number, account);
            if (updated) {
                return Response.ok("{\"message\":\"Account updated successfully\"}").build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"message\":\"Account not found or update failed\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    @DELETE
    @Path("/delete/{account_number}")
    public Response deleteAccount(@PathParam("account_number") String account_number) {
        try {
            boolean deleted = accountService.deleteAccount(account_number);
            if (deleted) {
                return Response.ok("{\"message\":\"Account deleted successfully\"}").build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"message\":\"Account not found or delete failed\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
//    @GET
//    @Path("/fetch")
//    public Response getAllAccounts() {
//        try {
//            List<Account> accounts = accountService.getAllAccounts();
//            return Response.ok(accounts).build();
//        } catch (Exception e) {
//            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
//                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
//                    .build();
//        }
//    }

    @GET
    @Path("fetch/accountNumber/{accountNumber}")
    public Response getAccountByAccountNumber(@PathParam("accountNumber") String accountNumber) {
        try {
            Account account = accountService.getAccountByAccountNumber(accountNumber);
            if (account != null) { 
                return Response.ok(account).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"message\":\"Account not found\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}

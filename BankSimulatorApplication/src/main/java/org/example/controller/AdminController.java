package org.example.controller;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.dto.LoginRequest;
import org.example.repository.AccountRepoImpl;
import org.example.repository.CustomerRepoImpl;
import org.example.repository.TransactionRepoImpl;
import org.example.service.AdminService;
import org.example.service.AdminServiceImpl;

@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminController {
    private final AdminService adminService=new AdminServiceImpl(
            new CustomerRepoImpl(),new AccountRepoImpl(),new TransactionRepoImpl()
    );
    @POST
    @Path("/login")
    public Response loginAdmin(LoginRequest admin){
       if(adminService.login(admin.getUsername(),admin.getPin(),admin.getEmail())){
              return Response.ok("{\"message\":\"Admin login successful\"}").build();
       }else{
              return Response.status(Response.Status.UNAUTHORIZED)
                     .entity("{\"message\":\"Invalid admin credentials\"}")
                     .build();
       }
    }
    @GET
    @Path("/all-customers")
    public Response getAllCustomers(){
        try {
            return Response.ok(adminService.getAllCustomers()).build();
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    @GET
    @Path("/all-accounts")
    public Response getAllAccounts(){
        try {
            return Response.ok(adminService.getAllAccounts()).build();
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    @GET
    @Path("/all-transactions")
    public Response getAllTransactions(){
        try {
            return Response.ok(adminService.getAllTransactions()).build();
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}

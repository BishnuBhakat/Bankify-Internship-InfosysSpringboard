package org.example.controller;


import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.Models.Customer;
import org.example.dto.LoginRequest;
import org.example.service.CustomerService;
import org.example.service.CustomerServiceImpl;

import java.util.List;


@Path(("/customers"))
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class CustomerController {
    private final CustomerService customerService = new CustomerServiceImpl();


    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCustomer( Customer customer) {

        try {
            if (customer.getCustomer_status() == null) {
                customer.setCustomer_status(Customer.status.ACTIVE);
            }
           boolean created=customerService.createCustomer(customer);
           if(created){
                return Response.status(Response.Status.CREATED)
                        .entity("{\"message\":\"Customer created successfully\"}")
                        .build();
           }
           return Response.status(Response.Status.BAD_REQUEST)
                   .entity("{\"error\":\"Failed to create customer\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        }
    }

//    @GET
//    @Path("/fetch")
//    public Response getAllCustomers() {
//        try {
//            List<Customer> list = customerService.getAllCustomers();
//            return Response.ok(list).build();
//        } catch (Exception e) {
//            return Response.status(Response.Status.BAD_REQUEST)
//                    .entity("{\"error\":\"" + e.getMessage() + "\"}").build();
//        }
//    }

    @PUT
    @Path(("/update/{phone_number}"))
    public Response updateCustomer(@PathParam("phone_number") String phone_number, Customer customer) {
        try {
            boolean updated = customerService.updateCustomer(phone_number, customer);
            if (updated) {
                return Response.ok("{\"message\":\"Customer updated successfully\"}").build();
            }
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Customer not found\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        }
    }

    @DELETE
    @Path("/delete/{phone_number}")
    public Response deleteCustomer(@PathParam("phone_number") String phone_number) {
        try {
            boolean deleted = customerService.deleteCustomer(phone_number);
        if (deleted){
            return Response.ok("Customer deleted successfully").build();
        }
        return Response.status(Response.Status.NOT_FOUND)
                .entity("{\"error\":\"Customer not found\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        }
    }

    @GET
    @Path("/fetch/{phone_number}")
    public Response getCustomerByNumber(@PathParam("phone_number") String phone_number) {
        try {
            Customer customer = customerService.getCustomerByNumber(phone_number);
            if (customer != null) return Response.ok(customer).build();
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Customer not found\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        }
    }
    @POST
    @Path("/login")
    public Response loginCustomer(LoginRequest loginRequest){
        try {
            boolean result= customerService.login(
                    loginRequest.getUsername(),
                    loginRequest.getEmail(),
                    loginRequest.getPin()
            );
            if (result) {
                return Response.ok("{\"message\":\"Login Successful\",\"status\":true}").build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("{\"message\":\"Invalid Credentials\",\"status\":false}")
                        .build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}

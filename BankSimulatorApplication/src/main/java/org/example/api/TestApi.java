package org.example.api;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Map;

@Path("/test")
@Produces(MediaType.APPLICATION_JSON)
public class TestApi {

    @GET
    public Response ping() {
        return Response.ok(Map.of("status", "ok", "message", "Tomcat + Jersey is running")).build();
    }
}



package com.example.flightbooking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.nimbusds.jose.shaded.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/create-user")
    public UserCreationResponse createUser(@RequestBody UserCredentials credentials) throws Exception {
        CreateRequest request = new CreateRequest()
                .setEmail(credentials.email)
                .setPassword(credentials.password);

        FirebaseAuth auth = FirebaseAuth.getInstance();
        UserRecord record = auth.createUser(request);
        UserCreationResponse response = new UserCreationResponse();

        response.id = record.getUid();
        response.auth = this.signIn(credentials);

        return response;
    }

    @PostMapping("/sign-in")
    public AuthResponse signIn(@RequestBody UserCredentials credentials) throws Exception {
        String url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVnKD_bIIXjt2nlwlw8z-DtViJVYBqap0";
        JSONObject requestJson = new JSONObject();
        requestJson.put("email", credentials.email);
        requestJson.put("password", credentials.password);
        requestJson.put("returnSecureToken", true);

        StringEntity requestBody = new StringEntity(requestJson.toString());

        HttpClient client = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost(url);
        request.addHeader("Content-Type", "application/json");
        request.setEntity(requestBody);

        HttpResponse httpResponse = client.execute(request);
        HttpEntity responseBody = httpResponse.getEntity();
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = EntityUtils.toString(responseBody);
        JsonNode responseJson = mapper.readTree(jsonString);
        String idToken = responseJson.get("idToken").asText();
        String refreshToken = responseJson.get("refreshToken").asText();

        AuthResponse response = new AuthResponse();
        response.idToken = idToken;
        response.refreshToken = refreshToken;
        return response;
    }
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVnKD_bIIXjt2nlwlw8z-DtViJVYBqap0
}

class UserCreationResponse {
    public AuthResponse auth;
    public String id;
}
class UserCredentials {
    public String email;
    public String password;
}
class AuthResponse {
    public String idToken;
    public String refreshToken;
}

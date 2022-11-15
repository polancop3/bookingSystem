package com.example.flightbooking.interceptor;

import com.example.flightbooking.model.Authentication;
import com.example.flightbooking.model.Authentication.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.parser.Entity;

public class ClientRequestInterceptor extends HandlerInterceptorAdapter {

    private Authentication authentication;

    public ClientRequestInterceptor(Authentication authentication) {
        this.authentication = authentication;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        String authorization = request.getHeader("Authorization");

        if (authorization != null) {
            String idToken = authorization.split("\\s+")[1];
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String id = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String picture = decodedToken.getPicture();
            User user = new User(id, email, picture);

            authentication.setIdToken(idToken);
            authentication.setUser(user);
        }

        return true;
    }
}

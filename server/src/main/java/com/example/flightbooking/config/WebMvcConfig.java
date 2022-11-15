package com.example.flightbooking.config;

import com.example.flightbooking.interceptor.ClientRequestInterceptor;
import com.example.flightbooking.model.Authentication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebMvc
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(clientRequestInterceptor());
    }

    @Bean(name="clientAuthentication")
    @Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
    public Authentication clientAuthentication() {
        return new Authentication();
    }

    @Bean
    public ClientRequestInterceptor clientRequestInterceptor() {
        return new ClientRequestInterceptor(clientAuthentication());
    }

}

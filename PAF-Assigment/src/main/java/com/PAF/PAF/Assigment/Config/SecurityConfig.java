package com.PAF.PAF.Assigment.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Repository.UserRepo;
import com.PAF.PAF.Assigment.Service.UserService;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/register",
                                "/login",
                                "/api/auth/**",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/api/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(authorization -> authorization
                                .baseUri("/oauth2/authorization")
                        )
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/oauth2/callback/*")
                        )
                        .successHandler(new AuthenticationSuccessHandler() {
                            @Override
                            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                                org.springframework.security.core.Authentication authentication) throws IOException, ServletException {
                                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

                                // Get user details from OAuth2User
                                String email = oauth2User.getAttribute("email");
                                String name = oauth2User.getAttribute("name");
                                String picture = oauth2User.getAttribute("picture");

                                System.out.println("OAuth2 User Details: " + oauth2User.getAttributes());

                                UserEntity user = userService.getUserByEmail(email);

                                String userId = user.getId();

                                // Redirect to frontend with user data
                                String redirectUrl = "http://localhost:3000/userProfile/" + userId;

                                System.out.println("Redirecting to: " + redirectUrl);
                                response.sendRedirect(redirectUrl);
                            }
                        })
                );

        return http.build();
    }

}

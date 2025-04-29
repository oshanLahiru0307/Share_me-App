package com.PAF.PAF.Assigment.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Configure CSRF (e.g., disable it)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/register",
                                "/login",
                                "/api/auth/**",
                                "/api/auth/**",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/learningPlan/**",
                                "/api/**"
                        ).permitAll() // Public endpoints
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .defaultSuccessUrl("/dashboard", true)
                        .permitAll()
                )
                .logout(LogoutConfigurer::permitAll
                );

        return http.build();
    }
}

package com.example.vehiclemanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class securityConfig {

    @Bean
    PasswordEncoder passwordEncoder(){
        System.out.println("PASSWORD\n");
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws  Exception{
        System.out.printf("FILTER CHIAN \n");
        http.authorizeHttpRequests(
                        r -> {
                            r.requestMatchers(HttpMethod.DELETE, "/api/**").hasAuthority("admin");
                            r.requestMatchers(HttpMethod.PUT, "/api/**").hasAuthority("admin");

                            r.requestMatchers("/users/register").permitAll();
                            r.requestMatchers("/login").permitAll();
                            r.anyRequest().authenticated();
                        })
                .httpBasic(Customizer.withDefaults())
                .formLogin(Customizer.withDefaults());

        return  http.build();
    }
}

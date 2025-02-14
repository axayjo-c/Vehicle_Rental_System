package com.example.vehiclemanagement.security;

import com.example.vehiclemanagement.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class SecurityUser implements UserDetails {

    private  User user;
    private String role;
    private String password;

    public SecurityUser(User user) {
        this.user = user;
    }

    public SecurityUser(User user, String password,String role) {
        this.user = user;
        this.role = role;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(()->this.role);
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }
}

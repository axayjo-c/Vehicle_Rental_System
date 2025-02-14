package com.example.vehiclemanagement.entity;

import org.springframework.data.annotation.Id;

public class User {
    @Id
    private String user_id;
    private String username;
    private String email;
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }





    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", name='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

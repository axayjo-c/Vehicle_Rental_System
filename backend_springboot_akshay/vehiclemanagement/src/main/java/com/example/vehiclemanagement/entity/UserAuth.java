package com.example.vehiclemanagement.entity;

public class UserAuth {
    String user_id;
    String password ;
    String role;

    public UserAuth(String user_id, String password, String role) {
        this.user_id = user_id;
        this.password = password;
        this.role = role;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

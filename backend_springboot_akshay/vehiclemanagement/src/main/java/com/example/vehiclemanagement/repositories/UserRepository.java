package com.example.vehiclemanagement.repositories;

import com.example.vehiclemanagement.entity.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User,Integer> {
    @Query("SELECT * FROM users")
    List<User> getAllUsers();
    @Query("SELECT * FROM users WHERE username = :username")
    User getUserWithUsername(String username);

}

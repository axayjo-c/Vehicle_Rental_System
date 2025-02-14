package com.example.vehiclemanagement.repositories;

import com.example.vehiclemanagement.entity.UserAuth;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface PasswordRoleRepository extends CrudRepository<UserAuth, Integer>{
    @Query("SELECT * FROM user_auth where user_id = :userId")
    UserAuth getCredentials(String userId);
}

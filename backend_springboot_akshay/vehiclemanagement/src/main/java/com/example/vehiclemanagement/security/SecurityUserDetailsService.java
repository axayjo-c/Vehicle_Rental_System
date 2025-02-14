package com.example.vehiclemanagement.security;

import com.example.vehiclemanagement.entity.User;
import com.example.vehiclemanagement.entity.UserAuth;
import com.example.vehiclemanagement.repositories.PasswordRoleRepository;
import com.example.vehiclemanagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordRoleRepository passwordRoleRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("CALLED FOR " + username);
        User user = userRepository.getUserWithUsername(username);
        UserAuth userAuth = passwordRoleRepository.getCredentials(user.getUser_id());
        return new SecurityUser(user,userAuth.getPassword(),userAuth.getRole());
    }
}

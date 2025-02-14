package com.example.vehiclemanagement.repositories;

import com.example.vehiclemanagement.entity.Payment;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface PaymentRepository extends CrudRepository<Payment,Integer> {

    @Query("SELECT * FROM payments")
    List<Payment> getAllPayment();
}

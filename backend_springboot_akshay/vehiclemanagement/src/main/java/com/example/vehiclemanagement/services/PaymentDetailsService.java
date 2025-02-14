package com.example.vehiclemanagement.services;

import com.example.vehiclemanagement.entity.Payment;
import com.example.vehiclemanagement.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentDetailsService {
    @Autowired
    PaymentRepository paymentRepository;

    public List<Payment> getALl(){
       return paymentRepository.getAllPayment();
    }
}

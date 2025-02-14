package com.example.vehiclemanagement.services;

import com.example.vehiclemanagement.entity.Booking;
import com.example.vehiclemanagement.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BookingDetalisService {

    @Autowired
    BookingRepository bookingRepository;

    public List<Booking> getALl(){
        return bookingRepository.getAllBooking();
    }

}

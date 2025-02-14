package com.example.vehiclemanagement.repositories;

import com.example.vehiclemanagement.entity.Booking;
import com.example.vehiclemanagement.entity.Payment;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface BookingRepository extends CrudRepository<Booking,Integer> {

    @Query("SELECT * FROM bookings")
    List<Booking> getAllBooking();
}

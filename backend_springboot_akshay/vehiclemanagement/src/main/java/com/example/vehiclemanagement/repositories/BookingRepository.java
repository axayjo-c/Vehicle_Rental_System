package com.example.vehiclemanagement.repositories;

import com.example.vehiclemanagement.entity.Booking;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


public interface BookingRepository extends CrudRepository<Booking,Integer> {

    @Query("SELECT * FROM bookings")
    List<Booking> getAllBooking();

    @Modifying
    @Query(
    "INSERT INTO bookings (user_id, vehicle_id, start_date, end_date, total_price, status)" +
    "VALUES (:userId, :vehicleId, :startDate, :endDate, :totalPrice, :status)")
    void generateBooking(int userId,
                          int vehicleId,
                          Date startDate,
                          Date endDate,
                          BigDecimal totalPrice,
                         String status);

}

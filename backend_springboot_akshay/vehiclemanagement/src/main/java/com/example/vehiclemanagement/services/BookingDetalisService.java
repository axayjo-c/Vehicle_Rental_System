package com.example.vehiclemanagement.services;

import com.example.vehiclemanagement.entity.Booking;
import com.example.vehiclemanagement.entity.BookingRequest;
import com.example.vehiclemanagement.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
@Service
public class BookingDetalisService {

    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    VehicleDetailsService vehicleDetailsService;

    public List<Booking> getALl(){
        return bookingRepository.getAllBooking();
    }

    public String createBookingWith(BookingRequest bookingRequest){

        System.out.println("::");
        int userId=Integer.valueOf(bookingRequest.getUserId());
        int vehicleId = Integer.valueOf(bookingRequest.getVehicleId());
        Date startDate = bookingRequest.getStartDate();
        Date endDate = bookingRequest.getEndDate();
        BigDecimal totalPrice = vehicleDetailsService.getPriceWithId(bookingRequest.getVehicleId());
        System.out.println("total price : "+totalPrice);
        String status = "Unavailable";
        System.out.println(":(");

         bookingRepository.generateBooking(userId,vehicleId,startDate,endDate,totalPrice,status);
         return "DONE";
    };
}

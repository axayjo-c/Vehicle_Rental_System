package com.example.vehiclemanagement.controllers;

import com.example.vehiclemanagement.services.BookingDetalisService;
import com.example.vehiclemanagement.services.PaymentDetailsService;
import com.example.vehiclemanagement.services.VehicleDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class TestController {

//
//    PaymentDetailsService paymentDetailsService;
//    BookingDetalisService bookingDetalisService;
//    VehicleDetailsService vehicleDetailsService;
//
//    public TestController(
//                          PaymentDetailsService paymentDetailsService,
//                          BookingDetalisService bookingDetalisService,
//                          VehicleDetailsService vehicleDetailsService) {
//        this.paymentDetailsService = paymentDetailsService;
//        this.bookingDetalisService = bookingDetalisService;
//        this.vehicleDetailsService = vehicleDetailsService;
//    }

    @GetMapping("/test")
    public String admin(){

        return  "home.html";

    }

    @RequestMapping("/home")
    public String home(){
        return  "home.html";
    }


}

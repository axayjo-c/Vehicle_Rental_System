package com.example.vehiclemanagement.api;

import com.example.vehiclemanagement.entity.BookingRequest;
import com.example.vehiclemanagement.entity.User;
import com.example.vehiclemanagement.entity.Vehicle;
import com.example.vehiclemanagement.services.BookingDetalisService;
import com.example.vehiclemanagement.services.PaymentDetailsService;
import com.example.vehiclemanagement.services.VehicleDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class apiController {


    BookingDetalisService bookingDetalisService;
    VehicleDetailsService vehicleDetailsService;
    PaymentDetailsService paymentDetailsService;

    public apiController(BookingDetalisService bookingDetalisService,
                         VehicleDetailsService vehicleDetailsService,
                         PaymentDetailsService paymentDetailsService) {
        this.bookingDetalisService = bookingDetalisService;
        this.vehicleDetailsService = vehicleDetailsService;
        this.paymentDetailsService = paymentDetailsService;
    }


    @PostMapping ("/users/register")
    public String registerUser(@RequestParam String username,@RequestParam String password){
            //Do later with Spring Security.
            return "index";
    }

    @GetMapping("/api/vehicles")
    public List<Vehicle> getVehicle(){
        return vehicleDetailsService.getAll();
    }

    @PostMapping("/api/vehicles")
    public Vehicle getVehicleById(@RequestParam String vehicle_id){

        return vehicleDetailsService.vehicleWithId(Integer.valueOf(vehicle_id));
    }

    @DeleteMapping("/api/vehicles/")
    public void deleteVehicle(@RequestParam String vehicle_id){
        vehicleDetailsService.deleteVehicleWithId(vehicle_id);
    }

    @PutMapping("/api/vehicles")
    public Vehicle updateVehicle(@RequestBody Vehicle vehicle){
        vehicleDetailsService.updateVehicle(vehicle);
        return this.vehicleDetailsService.vehicleWithId(vehicle.getVehicle_id());
    }


    @PostMapping("/api/bookings/create")
    public String book(@RequestBody BookingRequest bookingRequest){

        System.out.println(":)");
       return bookingDetalisService.createBookingWith(bookingRequest);


    }

}

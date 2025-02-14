package com.example.vehiclemanagement.services;

import com.example.vehiclemanagement.entity.Vehicle;
import com.example.vehiclemanagement.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleDetailsService {
    @Autowired
    VehicleRepository vehicleRepository;

    public List<Vehicle> getAll(){
        return this.vehicleRepository.getAllVehicles();
    }

    public Vehicle vehicleWithId(Integer vehicleId) {
        return vehicleRepository.getVehicleById(vehicleId);

    }

    public void deleteVehicleWithId(String vehicleId) {
        vehicleRepository.delete(Integer.valueOf(vehicleId));
    }

    public void updateVehicle(Vehicle vehicle) {
        vehicleRepository.update(vehicle.getVehicle_id(),
                vehicle.getType(),
                vehicle.getBrand(),
                vehicle.getModel(),vehicle.getPrice_per_day(),
                vehicle.getAvailability(),vehicle.getRegistration_number());
    }
}

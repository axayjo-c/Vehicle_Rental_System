package com.example.vehiclemanagement.repositories;

import com.example.vehiclemanagement.entity.Vehicle;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.math.BigDecimal;
import java.util.List;

public interface VehicleRepository extends CrudRepository<Vehicle,Integer> {

    @Query("SELECT * FROM vehicles")
    List<Vehicle> getAllVehicles();
    @Query("SELECT * FROM vehicles WHERE vehicle_id=:vehicleId")
    Vehicle getVehicleById(Integer vehicleId);

    @Modifying
    @Query("DELETE * FROM vehicles WHERE vehicle_id = :vehicleId")
    void delete(Integer vehicleId);

    @Modifying
    @Query("UPDATE vehicles " +
            "SET brand = :brand," +
            "model=:model," +
            "price_per_day=:pricePerDay," +
            "type=:type,"+
            "availability=:availability," +
            "registration_number=:registrationNumber" +
            " WHERE vehicle_id = :vehicleId")
    void update(Integer vehicleId,String type,
                String brand, String model,
                Integer pricePerDay, String availability,
                String registrationNumber);

    @Query("SELECT price_per_day FROM vehicles WHERE vehicle_id = :vehicleId")
    BigDecimal getPriceFor(String vehicleId);

}

package com.example.vehiclemanagement.entity;

import org.springframework.data.annotation.Id;

public class Vehicle {

    @Id
    private Integer vehicle_id;
    private String type;
    private String brand;
    private String model;
    private Integer price_per_day;
    private String availability;
    private String registration_number;



    @Override
    public String toString() {
        return "Vehicle{" +
                "vehicle_id=" + vehicle_id +
                ", type='" + type + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", price_per_day=" + price_per_day +
                ", availability='" + availability + '\'' +
                ", registration_number='" + registration_number + '\'' +
                '}';
    }

    public String getRegistration_number() {
        return registration_number;
    }

    public void setRegistration_number(String registration_number) {
        this.registration_number = registration_number;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Integer getPrice_per_day() {
        return price_per_day;
    }

    public void setPrice_per_day(Integer price_per_day) {
        this.price_per_day = price_per_day;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getVehicle_id() {
        return vehicle_id;
    }

    public void setVehicle_id(Integer vehicle_id) {
        this.vehicle_id = vehicle_id;
    }
}

package com.example.vehiclemanagement.entity;

import java.util.Date;

public class BookingRequest {
    //| booking_id | user_id | vehicle_id | start_date | end_date   | total_price | status    |
    //+------------+---------+------------+------------+------------+-------------+-----------+
    private  String vehicleId;
    private Date startDate;
    private Date endDate;
    private String userId;

    public String getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

}

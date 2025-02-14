package com.example.vehiclemanagement.entity;

import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Payment {
    @Id
    private Integer payment_id;
    private Integer booking_id;
    private BigDecimal amount;
    private String payment_satus;
    private Timestamp payment_date;

    public Integer getPayment_id() {
        return payment_id;
    }

    public void setPayment_id(Integer payment_id) {
        this.payment_id = payment_id;
    }

    public Integer getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(Integer booking_id) {
        this.booking_id = booking_id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPayment_satus() {
        return payment_satus;
    }

    public void setPayment_satus(String payment_satus) {
        this.payment_satus = payment_satus;
    }

    public Timestamp getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(Timestamp payment_date) {
        this.payment_date = payment_date;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "payment_id=" + payment_id +
                ", booking_id=" + booking_id +
                ", amount=" + amount +
                ", payment_satus='" + payment_satus + '\'' +
                ", payment_date=" + payment_date +
                '}';
    }
}

package com.example.flightbooking.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public @Data
class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int flightNo;
    private int duration;
    private String source;
    private String destination;
    private int price;
    private Date date;
}

package com.example.flightbooking.model;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public @Data class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    private int flightId;
    private String userId;
}

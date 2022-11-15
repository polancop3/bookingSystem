package com.example.flightbooking.repository;

import com.example.flightbooking.model.Flight;
import org.springframework.data.repository.CrudRepository;

public interface FlightRepository extends CrudRepository<Flight, Integer> {
}

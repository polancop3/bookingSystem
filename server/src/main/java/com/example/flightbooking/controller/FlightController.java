package com.example.flightbooking.controller;

import com.example.flightbooking.model.Flight;
import com.example.flightbooking.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "/flight")
public class FlightController {
    @Autowired
    FlightRepository flightRepository;

    @GetMapping
    public @ResponseBody Iterable<Flight> getFlight(){
       return flightRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    Optional<Flight> getFlightById(@PathVariable("id") int id){
        return flightRepository.findById(id);}

    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }

    @PutMapping(path = "/{id}")
    public Flight updateFlight(@PathVariable("id") int id, @RequestBody Flight flight) {
        //check if flight exist by id before updating
        return flightRepository.save(flight);
    }

    @DeleteMapping(path = "/{id}")
    public HttpStatus deleteFlight(@PathVariable("id") int id) {
        flightRepository.deleteById(id);
        return HttpStatus.OK;
    }
}

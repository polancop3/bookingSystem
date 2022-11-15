package com.example.flightbooking.controller;

import com.example.flightbooking.model.AddTripRequest;
import com.example.flightbooking.model.Authentication;
import com.example.flightbooking.model.Flight;
import com.example.flightbooking.model.Trip;
import com.example.flightbooking.repository.FlightRepository;
import com.example.flightbooking.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping(path = "/trip")
public class TripController {
    @Autowired FlightRepository flightRepository;
    @Autowired TripRepository tripRepository;
    @Autowired Authentication authentication;


    @GetMapping
    public @ResponseBody Iterable<Trip> findAll() {
        return tripRepository.findAll();
    }

    @DeleteMapping(path = "/{id}")
    public HttpStatus deleteTrip(@PathVariable("id") int id) {
        tripRepository.deleteById(id);
        return HttpStatus.OK;
    }

    @PostMapping
    public Trip addTrip(@RequestBody AddTripRequest request) throws Exception {
        if (!flightRepository.existsById(request.getFlightId())) {
            throw new Exception("flight does not exist! " + request.getFlightId().toString());
        }

        Trip trip = new Trip();
        trip.setFlightId(request.getFlightId());
        trip.setUserId(authentication.getUser().getId());
        return tripRepository.save(trip);
    }
}





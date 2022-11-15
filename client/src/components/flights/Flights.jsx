import React, { useState } from 'react'
import { useEffect } from 'react';
import useAPI from '../../hooks/useAPI';

const Flight = ({ flight }) => {
  const { saveTrip, deleteFlightById } = useAPI() 
  
  const saveTripOnClick = (e) => {
    e.preventDefault();
    saveTrip({"flightId": flight.id})
    alert("Flight added!")
  }

  const deleteFlight = (e) => {
    deleteFlightById(flight.id)
  }

  return (
    <div>
      <ul>
        <li>FlightNo: {flight.flightNo}</li>
        <li>Flight duration: {flight.duration}</li>
        <li>Flight source: {flight.source}</li>
        <li>Flight Destination: {flight.destination}</li>
        <li>Date: { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(flight.date)}</li>
        <li>Price: ${flight.price}</li>
      <button onClick={saveTripOnClick}>Confirm flight</button>
      <button onClick={deleteFlight}>remove flight</button>
      </ul> 
    </div>
  )
}

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const { getAllFlights} = useAPI()

  useEffect(() => {
     getAllFlights()
    .then((flights) => setFlights(flights))
  }, [])

  return (
      <div>
       { flights.map((flight, index) => <Flight flight={flight} key={index}/>) }
      </div>
    );
}
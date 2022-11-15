import useAPI from "../../hooks/useAPI";
import { useState } from "react";
import { useEffect } from "react";



const Trip = ({ trip }) => {
  const { deleteTripById, getFlightById } = useAPI()
  const[flight,setFlight] = useState()
  
  const handleTripDeletion = (e) => {
    e.preventDefault()
    deleteTripById(trip.id)
  }

  // const showFlight = () => {
  //   setFlight(getFlightById(trip.flightId).then((flight) => setFlight(flight)))
  //   return(<div>{flight.flightNo}</div>)
  // }

    return (
      <div>Flight id:{trip.flightId} User:{trip.userId}<button onClick={handleTripDeletion}>Cancel trip</button></div>
    )
}

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const { getAllTrips } = useAPI();

    useEffect(() => {
      getAllTrips()
      .then((trip) => setTrips(trip))
    }, [])
  
    return (
        <div>
         { trips.map((trip, index) => <Trip trip={trip} key={index}/>) }
        </div>
      );
}

export default Trips;
import { useState } from "react"
import axios from "axios"
import useAPI from "../../hooks/useAPI"

const url = "http://localhost:8080/flight"
const Booking = () => {
    const[source, setSource] = useState("")
    const[destination, setDestination] = useState("")
    const[date, setDate] = useState("")
    const[duration,setDuration] = useState(4);
    const[flightNo, setFlightNo ] = useState(Math.floor(Math.random()*(2000) + 1))
    const[price, setPrice] = useState(Math.floor(Math.random()* 200) + 800);
    
    const {createFlight} = useAPI()
  
    function handleSourceChange(e) {
      setSource(e.target.value)
      console.log(e.target.value)
    }
  
    function handleDestinationChange(e) {
      setDestination(e.target.value)
    }
  
    function handleDateChange(e) {
      setDate(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        createFlight( 
        {"flightNo": flightNo,
        "duration": duration,
        "source": source,
        "destination": destination,
        "price": price,
        "date": date 
        })
    }
   
    return (
      <div>
       <form>
          <h3>Book a flight</h3>
          <div className="mb-3">
            <label>Source</label>
            <input type="text" className="form-control" placeholder="Enter Source" value={source} onChange={handleSourceChange}
            />
          </div>
          <div className="mb-3">
            <label>Destination</label>
            <input type="text" className="form-control" placeholder="Enter Destination" value={destination}
            onChange={handleDestinationChange}
            />
          </div>
          <div className="mb-3">
            <label>Date</label>
            <input type="date" className="form-control" placeholder="Enter Date" value={date}
            onChange={handleDateChange}
            />
          </div>
          <div className="d-grid">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">
              Book flight
            </button>
          </div>
        </form>
      </div>
    )
  }
  export default Booking;
import axios from "axios"
import { useAuth } from "../context/auth-context"

const HTTP_METHODS = {
    GET: "get",
    POST: "post",
    DELETE: "delete",
    PUT: "put"
}

const useAPI = () => {
    const { idToken } = useAuth()
    
    const performAPIRequest = ({ url, method, data }) => {
        const baseURL = 'http://localhost:8080';

        const headers = {
            "Authorization": `Bearer ${idToken}`,
            "Content-Type": "application/json"
        }

        const request = {
            method,
            baseURL,
            url,
            headers,
            data
        }

        return axios(request)
        .then((response) => response.data)
    }

    const getAllFlights = () => {
        return performAPIRequest({
            url: "/flight",
            method: HTTP_METHODS.GET,
        })
    }

    const deleteFlightById = (id) => {
        return performAPIRequest({
            url: `/flight/${id}`,
            method: HTTP_METHODS.DELETE,
        })
    }
    
    const updateFlightById = (id, data) => {
        return performAPIRequest({
            url: `/flight/${id}`,
            method: HTTP_METHODS.PUT,
            data
        })
    }

    const getFlightById = (id) => {
        return performAPIRequest({
            url: `/flight/${id}`,
            method: HTTP_METHODS.GET,
        })
    }

    const createFlight = (data) => {
        return performAPIRequest({
            url: "/flight",
            method: HTTP_METHODS.POST,
            data
        })
    }

    const getAllTrips = () => {
        return performAPIRequest({
            url: "/trip",
            method: HTTP_METHODS.GET,
        })
    }

    const deleteTripById = (id) => {
        return performAPIRequest({
            url: `/trip/${id}`,
            method: HTTP_METHODS.DELETE,
        })
    }

    const saveTrip = (data) => {
        return performAPIRequest({
            url: "/trip",
            method: HTTP_METHODS.POST,
            data
        })
    }

    return {
        getAllFlights,
        deleteFlightById,
        updateFlightById,
        createFlight,
        getFlightById,
        getAllTrips,
        deleteTripById,
        saveTrip,
    }
}

export default useAPI;
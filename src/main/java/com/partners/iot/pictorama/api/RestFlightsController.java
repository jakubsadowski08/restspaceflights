package com.partners.iot.pictorama.api;

import com.partners.iot.pictorama.persistence.Flight;
import com.partners.iot.pictorama.persistence.Tourist;
import com.partners.iot.pictorama.respository.FlightRepository;
import com.partners.iot.pictorama.respository.TouristRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
public class RestFlightsController {

    private final TouristRepository touristRepository;
    private final FlightRepository flightRepository;


    @Autowired
    RestFlightsController(TouristRepository touristRepository, FlightRepository flightRepository) {
        this.touristRepository = touristRepository;
        this.flightRepository = flightRepository;
    }

    @RequestMapping(value = "/tourists", method = RequestMethod.GET)
    Collection<Tourist> getAllTourists() {
        return this.touristRepository.findAll();
    }

    @RequestMapping(value = "/tourist", method = RequestMethod.POST)
    void addTourist(@RequestBody Tourist tourist) {
        touristRepository.save(tourist);
    }


    @RequestMapping(value = "/tourist/{touristId}", method = RequestMethod.GET)
    Set<Flight> getTouristsFlights(@PathVariable Long touristId) {
        return Objects.requireNonNull(this.touristRepository.findById(touristId).orElse(null)).getFlights();
    }

    @RequestMapping(value = "/tourist/{touristId}", method = RequestMethod.DELETE)
    void deleteTouristById(@PathVariable Long touristId) {
        touristRepository.delete(touristId);
    }

    @RequestMapping(value = "/tourist/{touristId}/flight/{flightId}", method = RequestMethod.PUT)
    void editTourist(@PathVariable Long flightId, @PathVariable Long touristId) {
        Optional<Tourist> tourist = touristRepository.findById(touristId);

        if (tourist.isPresent()) {
            Tourist touristUnwrapped = tourist.get();
            Optional<Flight> flight = flightRepository.findById(flightId);
            if (flight.isPresent()) {
                touristUnwrapped.addFlight(flight.orElse(null));
                touristRepository.saveAndFlush(touristUnwrapped);
            }

        }
    }

    @RequestMapping(value = "/tourist/{touristId}/flight/{flightId}", method = RequestMethod.DELETE)
    void deleteFlightFromTourist(@PathVariable Long flightId, @PathVariable Long touristId) {
        Optional<Tourist> tourist = touristRepository.findById(touristId);

        if (tourist.isPresent()) {
            Tourist touristUnwrapped = tourist.get();
            Optional<Flight> flight = flightRepository.findById(flightId);
            if (flight.isPresent()) {
                touristUnwrapped.removeFlight(flight.orElse(null));
                touristRepository.saveAndFlush(touristUnwrapped);
            }

        }
    }

    @RequestMapping(value = "/flights", method = RequestMethod.GET)
    Collection<Flight> getAllFlights() {
        return this.flightRepository.findAll();
    }

    @RequestMapping(value = "/flight", method = RequestMethod.POST)
    void addFlight(@RequestBody Flight flight) {
        flightRepository.save(flight);
    }


    @RequestMapping(value = "/flight/{flightId}", method = RequestMethod.DELETE)
    void deleteFlightById(@PathVariable Long flightId) {
        flightRepository.delete(flightId);
    }

    @RequestMapping(value = "/flights/{flightId}", method = RequestMethod.GET)
    Boolean isEmptySit(@PathVariable Long flightId) {
        return (Objects.requireNonNull(flightRepository.findById(flightId).orElse(null))).capacity > (Objects.requireNonNull(flightRepository.findById(flightId).orElse(null))).getTourists().size();

    }

    @RequestMapping(value = "/flight/{flightId}/tourist/{touristId}", method = RequestMethod.PUT)
    void editFlight(@PathVariable Long touristId, @PathVariable Long flightId) {
        Optional<Flight> flight = flightRepository.findById(flightId);

        if (flight.isPresent()) {
            Flight flightUnwrapped = flight.get();
            Optional<Tourist> tourist = touristRepository.findById(touristId);
            if (tourist.isPresent()) {
                flightUnwrapped.addTourist(tourist.orElse(null));
                flightRepository.saveAndFlush(flightUnwrapped);
            }

        }
    }

    @RequestMapping(value = "/flight/{flightId}", method = RequestMethod.GET)
    Set<Tourist> getFlightsTourists(@PathVariable Long flightId) {
        return Objects.requireNonNull(this.flightRepository.findById(flightId).orElse(null)).getTourists();
    }

    // Usuwanie dla usera /tourist/{userId}/flights/{flightId}
    // Usuwanie dla lotu /flights/{userId}/tourist/{flightId}

    @RequestMapping(value = "/flight/{flightId}/tourist/{touristId}", method = RequestMethod.DELETE)
    void deleteTouristFromFlight(@PathVariable Long touristId, @PathVariable Long flightId) {
        Optional<Flight> flight = flightRepository.findById(flightId);

        if (flight.isPresent()) {
            Flight flightUnwrapped = flight.get();
            Optional<Tourist> tourist = touristRepository.findById(touristId);
            if (tourist.isPresent()) {
                flightUnwrapped.removeTourist(tourist.orElse(null));
                flightRepository.saveAndFlush(flightUnwrapped);
            }

        }
    }


}

package com.partners.iot.pictorama.respository;

import com.partners.iot.pictorama.persistence.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    Optional<Flight> findById(Long id);
}
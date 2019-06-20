package com.partners.iot.pictorama.persistence;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
public class Tourist {
    @ManyToMany(cascade = CascadeType.DETACH)
    Set<Flight> flights;
    @Id
    @GeneratedValue
    private Long id;

    public String name;
    public String surname;
    public String sex;
    public String country;
    public String notes;
    public Date birthDate;

    public void addFlight(Flight flight) {
        flights.add(flight);
    }

    public Set<Flight> getFlights() {
        return flights;
    }

    public Long getId() {
        return id;
    }


    public void deleteFlight(Flight flight) {

        flights.remove(flight);
    }

    public Tourist() {

    }


}

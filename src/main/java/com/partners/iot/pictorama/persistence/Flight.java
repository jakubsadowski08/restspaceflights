package com.partners.iot.pictorama.persistence;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
public class Flight {
    @ManyToMany(cascade = CascadeType.ALL)
    Set<Tourist> tourists;
    @Id
    @GeneratedValue
    private Long id;
    public Date departureTime;
    public Date arrivalTime;
    public Integer capacity;
    public Double ticketPrice;


    public void addTourist(Tourist tourist) {

        tourists.add(tourist);
    }

    public void deleteTourist(Tourist tourist) {

        tourists.remove(tourist);
    }

    public Long getId() {
        return id;
    }

    public Set<Tourist> getTourists() {
        return tourists;
    }

    public Flight() {

    }
}

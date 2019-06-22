package com.partners.iot.pictorama.persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;



@Entity
@Data
@AllArgsConstructor
public class Tourist {
    @ManyToMany(cascade ={CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnore
    Set<Flight> flights;
    @Id
    @GeneratedValue
    private Long id;

    public String name;
    public String surname;
    public enum Sex {

        M,F

    }
    public Sex sex;
    public String country;
    public String notes;
    public Date birthDate;



    @PreRemove
    public void removeGroupsFromUsers() {
        for (Flight f : flights) {
            f.getTourists().remove(this);
        }
    }


    public void addFlight(Flight b) {
        flights.add(b);
        b.getTourists().add(this);
    }
    public void removeFlight(Flight b) {
        flights.remove(b);
        b.getTourists().remove(this);
    }


    public Set<Flight> getFlights() {
        return flights;
    }

    public void setFlights(Set <Flight> other) {this.flights = other;}

    public Long getId() {
        return id;
    }



    public Tourist() {

    }


}

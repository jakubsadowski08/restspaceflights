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
public class Flight {
    @ManyToMany(cascade ={CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnore
    Set<Tourist> tourists;
    @Id
    @GeneratedValue
    private Long id;
    public Date departureTime;
    public Date arrivalTime;
    public Integer capacity;
    public String ticketPrice;


    @PreRemove
    public void removeGroupsFromUsers() {
        for (Tourist t : tourists) {
            t.getFlights().remove(this);
        }
    }


    public void addTourist(Tourist b) {
        tourists.add(b);
        b.getFlights().add(this);
    }
    public void removeTourist(Tourist b) {
        tourists.remove(b);
        b.getFlights().remove(this);
    }







    public Long getId() {
        return id;
    }

    public Set<Tourist> getTourists() {
        return tourists;
    }



    public void setTourists(Set<Tourist> tourists) {
        this.tourists = tourists;
    }

    public Flight() {

    }
}

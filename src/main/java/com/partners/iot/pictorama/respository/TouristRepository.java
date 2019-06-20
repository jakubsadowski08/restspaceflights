package com.partners.iot.pictorama.respository;

import com.partners.iot.pictorama.persistence.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TouristRepository extends JpaRepository<Tourist, Long> {
    Optional<Tourist> findByName(String name);

    Optional<Tourist> findById(Long id);

}
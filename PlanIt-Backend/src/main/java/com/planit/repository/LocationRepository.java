package com.planit.repository;

import com.planit.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    // You can define custom query methods if needed
}

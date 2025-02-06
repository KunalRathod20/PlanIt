package com.planit.service;

import com.planit.model.Location;
import java.util.List;
import java.util.Optional;

public interface LocationService {
    // Fetch all locations
    List<Location> getAllLocations();

    // Fetch a single location by ID
    Optional<Location> getLocationById(Long id);

    // Create or update a location
    Location saveLocation(Location location);

    // Delete a location by ID
    void deleteLocation(Long id);
}

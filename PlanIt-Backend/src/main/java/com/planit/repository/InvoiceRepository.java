package com.planit.repository;


import com.planit.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    // You can add custom query methods if required, for example:
    Invoice findByEventId(Long eventId);  // Find invoice by event ID (example)

}


package com.planit.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    
    private Location location;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User user;

    @ManyToMany
    @JoinTable(
        name = "event_participants",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnore
    private List<User> participants = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Expense> expenses = new ArrayList<>();

	public Event(Long id) {
		super();
		this.id = id;
	}

	@OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
	 @JsonIgnore
    private List<Invoice> invoices = new ArrayList<>();  // Adding the invoices list

	 public void addInvoice(Invoice invoice) {
	        if (this.invoices == null) {
	            this.invoices = new ArrayList<>();
	        }
	        this.invoices.add(invoice);  // Add the new invoice
	    }
	 
	
    
    
}

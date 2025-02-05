import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    locationId: "", // Location ID will be selected from dropdown
  });
  const [locations, setLocations] = useState([]); // Store locations from API
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
  const token = user?.jwtToken; // Get JWT token

  // Fetch locations from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get("/locations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocations(response.data); // Set locations to state
      } catch (error) {
        console.error("Error fetching locations", error);
        alert("Failed to load locations.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchLocations();
  }, [token]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the correct JSON format
      const requestData = {
        title: event.title,
        description: event.description,
        date: event.date,
        location: { id: parseInt(event.locationId) }, // Convert locationId to object
        user: { id: user.userId }, // Get user ID from localStorage
      };

      const response = await api.post("/events/create", requestData, {
        headers: { Authorization: `Bearer ${token}` }, // Send JWT token
      });

      alert("Event created successfully!");

      // Extract the newly created event's ID and navigate to Add Expense page
      const eventId = response.data.id;
      navigate(`/add-expense/${eventId}`); // Redirect to AddExpense page with event ID
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={event.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          {loading ? (
            <p>Loading locations...</p>
          ) : (
            <select
              name="locationId"
              className="form-control"
              value={event.locationId}
              onChange={handleChange}
              required
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name} - {location.type}
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

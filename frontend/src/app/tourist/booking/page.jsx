"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import "../../styles/TouristBooking.scss";


// 🔹 Reusable Dropdown Component
const DropdownField = ({ label, id, value, onChange, options }) => (
  <div className="booking__field">
    <label className="booking__label">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="booking__select kanit-light"
    >
      <option value="">Choose an option</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);


const TouristBooking = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    timeSlot: "",
    date: null,
    location: "",
    tourType: "",
    language: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  const handleDateChange = (date) => setFormData((prev) => ({ ...prev, date }));

  const handleBooking = async () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }
  
    const { timeSlot, tourType, location, language, date } = formData;
  
    // Improved validation
    if (
      !timeSlot?.trim() ||
      !tourType?.trim() ||
      !location?.trim() ||
      !language?.trim() ||
      !date || isNaN(new Date(date).getTime())  // Ensure date is valid
    ) {
      alert("Please fill out all fields properly before confirming the booking.");
      return;  // Stop execution if validation fails
    }
  
    console.log("Confirm button clicked!");
    console.log("Sending Data:", formData);
  
    try {
      const storedUser = sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
  
      if (!user) {
        throw new Error("User not found in session");
      }
  
      const bookingData = {
        time_slot: timeSlot.trim(),
        tour_type: tourType.trim(),
        location: location.trim(),
        language: language.trim(),
        user: user.email,
        date: date.toISOString().split('T')[0],
      };
  
      const response = await fetch("http://localhost:8000/bookings/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.email}` // Remove this if your backend doesn't use it
        },
        body: JSON.stringify(bookingData),
      });
  
      console.log("Response Status:", response.status);
      const result = await response.json();
      console.log("API Response:", result);
  
      if (response.ok) {
        const query = new URLSearchParams({
          ...formData,
          date: date.toISOString().split("T")[0],
          message: "Booking successful!",
        }).toString();
  
        router.push(`/tourist/booking/confirmation?${query}`);
      } else {
        alert(result.message || "Booking failed, please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("An error occurred during booking. Please try again.");
    }
  };
  
  

  const handleClosePopup = () => setShowLoginPopup(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="booking kanit-light">
        <div className="booking__form-container">
          <h2 className="booking__title">Book a Guide</h2>
          <DropdownField
            id="location"
            label="Select Location"
            value={formData.location}
            onChange={handleChange}
            options={["Sasangir Park", "Saputara", "Somnath","Ambaji", "Dwarka"]}
          />
         <DatePicker
          label="Select Date"
          value={formData.date}
          onChange={handleDateChange}
          slots={{
            textField: (params) => <TextField {...params} fullWidth />
            }}
          />
          <DropdownField
            id="timeSlot"
            label="Select Time Slot"
            value={formData.timeSlot}
            onChange={handleChange}
            options={["30min", "1hour", "2hours"]}
          />
          <DropdownField
            id="tourType"
            label="Tour Type"
            value={formData.tourType}
            onChange={handleChange}
            options={["Cultural", "Historical", "Food Tour"]}
          />
          <DropdownField
            id="language"
            label="Language"
            value={formData.language}
            onChange={handleChange}
            options={["English", "Hindi", "French"]}
          />
          <button
            className="booking__button kanit-regular"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>

      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <h3>Please log in or sign up to continue</h3>
            <button className="popup-content__btn" onClick={() => router.push("/auth/Login")}>Login</button>
            <button className="popup-content__btn" onClick={() => router.push("/auth/SignUp")}>Sign Up</button>
            <button className="popup-content__btn-close" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </LocalizationProvider>
  );
};

export default TouristBooking;
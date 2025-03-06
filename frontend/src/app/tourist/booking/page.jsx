"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import "../../styles/TouristBooking.scss";

const TouristBooking = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ timeSlot: "", date: null, location: "", tourType: "", language: "" });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  const handleDateChange = (date) => setFormData((prev) => ({ ...prev, date }));

  
  const handleBooking = async () => {
    console.log("Confirm button clicked!");
    console.log("Sending Data:", formData);
  
    try {
      const response = await fetch("http://localhost:8000/bookings/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      console.log("Response Status:", response.status);
  
      const result = await response.json();
      console.log("API Response:", result);
  
      if (response.ok) {
        console.log("Redirecting to confirmation page...");
  
        // Ensure all form data is passed to the confirmation page
        const query = new URLSearchParams({
          ...formData, // Pass all form data
          date: formData.date ? formData.date.toISOString().split("T")[0] : "", // Convert date to string
          message: "Booking successful!",
        }).toString();
  
        router.push(`/tourist/booking/confirmation?${query}`);
      } else {
        alert(result.message || "Booking failed, please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  
  


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="booking kanit-light">
        <div className="booking__form-container">
          <h2 className="booking__title">Book a Guide</h2>
          <DropdownField id="location" label="Select Location" value={formData.location} onChange={handleChange} options={["Taj Mahal", "Jaipur", "Goa"]} />
          <DatePicker label="Select Date" value={formData.date} onChange={handleDateChange} renderInput={(params) => <TextField {...params} fullWidth />} />
          <DropdownField id="timeSlot" label="Select Time Slot" value={formData.timeSlot} onChange={handleChange} options={["30min", "1hour", "2hours"]} />
          <DropdownField id="tourType" label="Tour Type" value={formData.tourType} onChange={handleChange} options={["Cultural", "Historical", "Food Tour"]} />
          <DropdownField id="language" label="Language" value={formData.language} onChange={handleChange} options={["English", "Hindi", "French"]} />
          <button className="booking__button kanit-regular" onClick={handleBooking}>Confirm Booking</button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default TouristBooking;

// 🔹 Reusable Dropdown Component
const DropdownField = ({ label, id, value, onChange, options }) => (
  <div className="booking__field">
    <label className="booking__label">{label}</label>
    <select id={id} value={value} onChange={onChange} className="booking__select kanit-light">
      <option value="">Choose an option</option>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

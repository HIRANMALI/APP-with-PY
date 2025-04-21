"use client";

import Navbar from "@/app/components/Navbar";
import { useSearchParams } from "next/navigation";
import "./confirmation.scss"

const BookingConfirmation = () => {
  const searchParams = useSearchParams();
  const bookingDetails = Object.fromEntries(searchParams.entries());

  return (
    <>
      <Navbar />
      <div className="booking-confirmation">
        <h1 className="booking-confirmation__title">Booking Confirmed!</h1>
        <div className="booking-confirmation__details">
          <p className="booking-confirmation__item">
            <span className="booking-confirmation__label">Message:</span>
            <span className="booking-confirmation__value">{bookingDetails.message}</span>
          </p>
          <p className="booking-confirmation__item">
            <span className="booking-confirmation__label">Location:</span>
            <span className="booking-confirmation__value">{bookingDetails.location || "Not provided"}</span>
          </p>
          <p className="booking-confirmation__item">
            <span className="booking-confirmation__label">Date:</span>
            <span className="booking-confirmation__value">{bookingDetails.date || "Not provided"}</span>
          </p>
          <p className="booking-confirmation__item">
            <span className="booking-confirmation__label">Time Slot:</span>
            <span className="booking-confirmation__value">{bookingDetails.timeSlot || "Not provided"}</span>
          </p>
          <p className="booking-confirmation__item">
            <span className="booking-confirmation__label">Tour Type:</span>
            <span className="booking-confirmation__value">{bookingDetails.tourType || "Not provided"}</span>
          </p>
          <p className="booking-confirmation__item">
            <span className="booking-confirmation__label">Language:</span>
            <span className="booking-confirmation__value">{bookingDetails.language || "Not provided"}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;

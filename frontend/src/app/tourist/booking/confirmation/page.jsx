"use client";

import Navbar from "@/app/components/Navbar";
import { useSearchParams } from "next/navigation";

const BookingConfirmation = () => {
  const searchParams = useSearchParams();
  const bookingDetails = Object.fromEntries(searchParams.entries());

  return (

    <>
    <Navbar />
    <br />
    <div>
      <h1>Booking Confirmed!</h1>
      <p><strong>Message:</strong> {bookingDetails.message}</p>
      <p><strong>Location:</strong> {bookingDetails.location || "Not provided"}</p>
      <p><strong>Date:</strong> {bookingDetails.date || "Not provided"}</p>
      <p><strong>Time Slot:</strong> {bookingDetails.timeSlot || "Not provided"}</p>
      <p><strong>Tour Type:</strong> {bookingDetails.tourType || "Not provided"}</p>
      <p><strong>Language:</strong> {bookingDetails.language || "Not provided"}</p>
    </div>
    </>
  );
};

export default BookingConfirmation;

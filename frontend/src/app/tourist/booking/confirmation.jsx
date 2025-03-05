import { useSearchParams } from 'next/navigation';

const BookingConfirmation = () => {
  const searchParams = useSearchParams();
  const bookingDetails = Object.fromEntries(searchParams.entries());

  return (
    <div>
      <h1>Booking Confirmed!</h1>
      <p>Location: {bookingDetails.location}</p>
      <p>Date: {bookingDetails.date}</p>
      <p>Time Slot: {bookingDetails.timeSlot}</p>
      <p>Tour Type: {bookingDetails.tourType}</p>
      <p>Language: {bookingDetails.language}</p>
    </div>
  );
};

export default BookingConfirmation;

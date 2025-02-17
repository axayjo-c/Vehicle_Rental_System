import { useState } from "react";

const bookingsData = [
  { booking_id: "1", vehicle_id: "1", status: "Pending" },
  { booking_id: "2", vehicle_id: "3", status: "Pending" },
];

const BookingList = () => {
  const [bookings, setBookings] = useState(bookingsData);

  const handleUpdateBooking = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.booking_id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Booked Vehicles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.booking_id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <p className="text-lg">Booking ID: {booking.booking_id}</p>
            <p className="text-sm">Status: {booking.status}</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={() =>
                  handleUpdateBooking(booking.booking_id, "Accepted")
                }
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  handleUpdateBooking(booking.booking_id, "Rejected")
                }
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;

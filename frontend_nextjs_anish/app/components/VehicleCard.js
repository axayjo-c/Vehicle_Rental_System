import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import BookingForm from "./BookingForm";

export default function VehicleCard({ car }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const isAvailable = car.availability === "Available";
  const availabilityClass = isAvailable
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  // Handle modal opening
  const handleBookingOpen = () => {
    setIsBookingOpen(false); // Close existing modal first
    setTimeout(() => setIsBookingOpen(true), 100);
  };

  return (
    <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md text-black dark:text-gray-200 transition-all duration-300">
      {/* Vehicle Image */}
      <Image
        src={car.image_url || "/cars/default.jpg"}
        width={400}
        height={250}
        alt={`${car.brand} ${car.model}`}
        className="rounded-lg object-cover w-full h-48"
        priority // Faster loading
      />

      {/* Vehicle Details */}
      <h3 className="text-xl font-semibold mt-4 dark:text-gray-100">
        {car.brand} {car.model}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{car.type}</p>
      <p className="text-lg font-bold dark:text-gray-200">
        ₹{car.price_per_day}/day
      </p>
      <p className={`text-sm font-medium ${availabilityClass}`}>
        {car.availability}
      </p>

      {/* Book Now Button */}
      {isAvailable && (
        <button
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-400 rounded-lg font-medium transition-all"
          onClick={handleBookingOpen}
        >
          Book Now <ChevronRight size={18} />
        </button>
      )}

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingForm
          vehicleId={car.vehicle_id || "unknown"} // Ensure valid ID
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}

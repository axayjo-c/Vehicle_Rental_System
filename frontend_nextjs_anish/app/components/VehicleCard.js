import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import BookingForm from "./BookingForm";

export default function VehicleCard({ vehicle }) {
  // Debugging log
  console.log("VehicleCard received vehicle:", vehicle);

  // Always call useState unconditionally
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const isAvailable = vehicle ? vehicle.availability === "Available" : false; // Default to false if vehicle is undefined
  const availabilityClass = isAvailable
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  const handleBookingOpen = () => {
    setIsBookingOpen(true); // Directly set to true without reset
  };

  if (!vehicle) {
    return <div className="text-red-500">Vehicle data is missing!</div>;
  }

  return (
    <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md text-black dark:text-gray-200 transition-all duration-300">
      {/* Vehicle Image */}
      <Image
        src={vehicle.image_url || "/cars/default.jpg"} // Ensure default image exists
        width={400}
        height={250}
        alt={`${vehicle.brand} ${vehicle.model}`}
        className="rounded-lg object-cover w-full h-48"
        priority
      />

      {/* Vehicle Details */}
      <h3 className="text-xl font-semibold mt-4 dark:text-gray-100">
        {vehicle.brand} {vehicle.model}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{vehicle.type}</p>
      <p className="text-lg font-bold dark:text-gray-200">
        ₹{vehicle.price_per_day}/day
      </p>
      <p className={`text-sm font-medium ${availabilityClass}`}>
        {vehicle.availability}
      </p>

      {/* Book Now Button */}
      <button
        className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 ${
          isAvailable
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        } text-white dark:bg-blue-500 dark:hover:bg-blue-400 rounded-lg font-medium transition-all`}
        onClick={isAvailable ? handleBookingOpen : null} // Disable the click action if not available
        disabled={!isAvailable} // Disable button if vehicle is unavailable
      >
        {isAvailable ? "Book Now" : "Unavailable"} <ChevronRight size={18} />
      </button>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingForm
          vehicleId={vehicle.vehicle_id || "unknown"}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}

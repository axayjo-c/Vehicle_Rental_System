"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`
        );
        if (!response.ok) throw new Error("Failed to fetch vehicles");
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Function to remove a vehicle
  const deleteVehicle = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete vehicle");
      setVehicles(vehicles.filter((vehicle) => vehicle.vehicle_id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Loading vehicles...
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">All Vehicles</h2>

      {/* Categorized Vehicle Display */}
      {["Scooty", "Bike", "Car"].map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{category}s</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vehicles
              .filter((vehicle) => vehicle.type === category)
              .map((vehicle) => (
                <div
                  key={vehicle.vehicle_id}
                  className="bg-gray-200 dark:bg-gray-700 p-4 rounded shadow"
                >
                  {vehicle.image_url ? (
                    <div className="relative w-full h-32">
                      <Image
                        src={vehicle.image_url}
                        alt={vehicle.model}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded-md flex justify-center items-center">
                      <span className="text-white">No Image Available</span>
                    </div>
                  )}
                  <h4 className="font-medium mt-2">
                    {vehicle.brand} {vehicle.model}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {vehicle.price_per_day}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteVehicle(vehicle.vehicle_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

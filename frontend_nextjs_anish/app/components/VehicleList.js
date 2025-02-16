"use client";

import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  if (loading) return <p className="text-center">Loading vehicles...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        Available Vehicles
      </h2>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mt-2">
        Choose from a variety of vehicles for rent.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {vehicles.map((car) => (
          <VehicleCard key={car.vehicle_id} car={car} />
        ))}
      </div>
    </section>
  );
}

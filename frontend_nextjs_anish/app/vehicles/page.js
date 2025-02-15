"use client";

import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/vehicles?nocache=${Date.now()}`,
          {
            signal: abortController.signal,
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching vehicles:", error);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();

    return () => abortController.abort(); // Cleanup on unmount
  }, []);

  if (loading)
    return <p className="text-center text-lg">Loading vehicles...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Explore Our Vehicles</h1>
        <p className="text-lg text-[var(--text-muted)] mt-3">
          Choose from a variety of vehicles for every journey.
        </p>
      </div>

      {/* 🚘 Vehicles Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {vehicles.map((car) => (
          <VehicleCard key={car.vehicle_id} car={car} />
        ))}
      </div>
    </main>
  );
}

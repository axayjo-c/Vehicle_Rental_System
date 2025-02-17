"use client"; // Ensure this is at the top of your file

import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import Spinner from "../components/Spinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchVehicles = async () => {
      try {
        console.log("Fetching vehicles from:", `${API_URL}/api/vehicles`); // Debug log for the API URL
        const response = await fetch(`${API_URL}/api/vehicles`, {
          signal: abortController.signal,
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched vehicles:", data); // Log the fetched data
        setVehicles(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching vehicles:", error); // Log the error if it's not an abort error
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();

    return () => abortController.abort(); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.log("Error encountered:", error); // Log error if present
    return <p className="text-center text-red-500 py-16">Error: {error}</p>;
  }

  // Debug log for vehicles state
  console.log("Vehicles state:", vehicles);

  // Filter vehicles by type
  const cars = vehicles.filter((vehicle) => vehicle.type === "Car");
  const bikes = vehicles.filter((vehicle) => vehicle.type === "Bike");
  const trucks = vehicles.filter((vehicle) => vehicle.type === "Truck");
  const suvs = vehicles.filter((vehicle) => vehicle.type === "SUV"); // Add filtering for SUV

  return (
    <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Explore Our Vehicles</h1>
        <p className="text-lg text-[var(--text-muted)] mt-3">
          Choose from a variety of vehicles for every journey.
        </p>
      </div>

      {/* 🚘 Cars Section */}
      {cars.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mt-10 text-center">Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {cars.map((car) => (
              <VehicleCard key={car.vehicle_id} vehicle={car} />
            ))}
          </div>
        </section>
      )}

      {/* 🏍️ Bikes Section */}
      {bikes.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mt-10 text-center">Bikes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {bikes.map((bike) => (
              <VehicleCard key={bike.vehicle_id} vehicle={bike} />
            ))}
          </div>
        </section>
      )}

      {/* 🚚 Trucks Section */}
      {trucks.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mt-10 text-center">Trucks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {trucks.map((truck) => (
              <VehicleCard key={truck.vehicle_id} vehicle={truck} />
            ))}
          </div>
        </section>
      )}

      {/* 🚙 SUV Section */}
      {suvs.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mt-10 text-center">SUVs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {suvs.map((suv) => (
              <VehicleCard key={suv.vehicle_id} vehicle={suv} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

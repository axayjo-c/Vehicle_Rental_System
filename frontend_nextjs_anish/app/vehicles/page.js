"use client";

import Image from "next/image";
import Link from "next/link";
import { Car, ChevronRight } from "lucide-react";

export default function Vehicles() {
  // 🔥 Sample Vehicles Data (Replace with API Data)
  const vehicles = [
    {
      name: "Tesla Model 3",
      price: "₹5,500/day",
      img: "/cars/tesla.jpg",
      type: "Electric",
    },
    {
      name: "Mercedes-Benz G-Class",
      price: "₹15,000/day",
      img: "/cars/mercedes.jpg",
      type: "Luxury",
    },
    {
      name: "BMW X5",
      price: "₹10,000/day",
      img: "/cars/bmw.jpg",
      type: "SUV",
    },
    {
      name: "Toyota Fortuner",
      price: "₹7,500/day",
      img: "/cars/fortuner.jpg",
      type: "SUV",
    },
    {
      name: "Audi A6",
      price: "₹9,500/day",
      img: "/cars/audi.jpg",
      type: "Luxury",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Explore Our Vehicles</h1>
        <p className="text-lg text-[var(--text-muted)] mt-3">
          Choose from a variety of cars for every journey.
        </p>
      </div>

      {/* 🚘 Vehicles Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {vehicles.map((car, index) => (
          <VehicleCard key={index} car={car} />
        ))}
      </div>
    </main>
  );
}

/* 🏗️ Reusable Vehicle Card Component */
function VehicleCard({ car }) {
  return (
    <div className="card p-4">
      <Image
        src={car.img}
        width={400}
        height={250}
        alt={car.name}
        className="rounded-lg shadow-md"
      />
      <h3 className="text-xl font-semibold mt-4">{car.name}</h3>
      <p className="text-sm text-[var(--text-muted)]">{car.type}</p>
      <p className="text-lg font-bold">{car.price}</p>
      <Link href="/booking">
        <button className="btn-primary mt-4 w-full flex items-center justify-center gap-2">
          Book Now <ChevronRight size={18} />
        </button>
      </Link>
    </div>
  );
}

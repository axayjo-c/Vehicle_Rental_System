"use client";

import { useState } from "react";
import VehicleList from "./VehicleList";
import BookingList from "../components/BookingList";
import AddVehicleForm from "../components/AddVehicleForm";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-4">
        Admin Dashboard
      </h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        {["bookings", "vehicles"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ease-in-out ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {tab === "bookings" ? "Booked Vehicles" : "All Vehicles"}
          </button>
        ))}
      </div>

      {/* Add Vehicle Form Toggle */}
      {activeTab === "vehicles" && (
        <div className="text-center mb-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm rounded-lg transition-all duration-300 ease-in-out"
          >
            {showForm ? "Close Form" : "Add New Vehicle"}
          </button>
        </div>
      )}

      {/* Add Vehicle Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto mb-4">
          <AddVehicleForm setShowForm={setShowForm} />
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {activeTab === "bookings" ? <BookingList /> : <VehicleList />}
      </div>
    </div>
  );
}

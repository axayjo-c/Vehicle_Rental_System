"use client";

import { useState, useEffect, useCallback } from "react";
import VehicleList from "./VehicleList";
import BookingList from "../components/BookingList";
import AddVehicleForm from "../components/AddVehicleForm";
import { Toaster, toast } from "react-hot-toast";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [showForm, setShowForm] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch Vehicles with Cleanup
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    const controller = new AbortController();

    try {
      console.log("Fetching vehicles...");
      const response = await fetch(`${API_URL}/api/vehicles`, {
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Failed to fetch vehicles");

      const data = await response.json();
      console.log("Vehicles fetched successfully:", data);
      setVehicles(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching vehicles:", error);
        toast.error("Failed to fetch vehicles.");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // Cleanup function to prevent memory leaks
  }, [API_URL]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // Add Vehicle
  const addVehicle = async (vehicleData) => {
    try {
      console.log("Adding new vehicle:", vehicleData);
      const response = await fetch(`${API_URL}/api/admin/vehicles`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) throw new Error("Failed to add vehicle");

      toast.success("Vehicle added successfully!");
      setShowForm(false);
      fetchVehicles(); // Refresh list
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error("Failed to add vehicle.");
    }
  };

  // Update Vehicle
  const updateVehicle = async (vehicleId, updatedData) => {
    try {
      console.log(`Updating vehicle ID ${vehicleId}:`, updatedData);
      const response = await fetch(
        `${API_URL}/api/admin/vehicles/${vehicleId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update vehicle");

      toast.success("Vehicle updated successfully!");
      fetchVehicles(); // Refresh list
    } catch (error) {
      console.error("Error updating vehicle:", error);
      toast.error("Failed to update vehicle.");
    }
  };

  // Delete Vehicle with Confirmation Modal
  const deleteVehicle = async (vehicleId) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      console.log(`Deleting vehicle ID: ${vehicleId}`);
      const response = await fetch(
        `${API_URL}/api/admin/vehicles/${vehicleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete vehicle");

      toast.success("Vehicle deleted successfully!");
      fetchVehicles(); // Refresh list
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete vehicle.");
    }
  };

  // Filter vehicles by category
  const filteredVehicles = selectedCategory
    ? vehicles.filter((vehicle) => vehicle.type === selectedCategory)
    : vehicles;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <Toaster position="top-center" />

      <h1 className="text-2xl font-semibold text-center mb-4">
        Admin Dashboard
      </h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        {["bookings", "vehicles"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "bookings") setSelectedCategory("");
            }}
            className={`px-4 py-2 text-sm font-medium rounded transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
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
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded transition"
          >
            {showForm ? "Close Form" : "Add New Vehicle"}
          </button>
        </div>
      )}

      {/* Add Vehicle Form */}
      {showForm && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow max-w-lg mx-auto mb-4">
          <AddVehicleForm addVehicle={addVehicle} setShowForm={setShowForm} />
        </div>
      )}

      {/* Main Content */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
        {activeTab === "bookings" ? (
          <BookingList />
        ) : loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading vehicles...
          </p>
        ) : filteredVehicles.length > 0 ? (
          <VehicleList
            vehicles={filteredVehicles}
            fetchVehicles={fetchVehicles}
            updateVehicle={updateVehicle}
            deleteVehicle={deleteVehicle}
          />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No vehicles available.
          </p>
        )}
      </div>
    </div>
  );
}

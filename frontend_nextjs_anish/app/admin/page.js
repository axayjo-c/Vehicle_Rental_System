"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import UsersManagement from "../components/admin/UsersManagement";
import Transactions from "../components/admin/Transactions";
import Reports from "../components/admin/Reports";
import Support from "../components/admin/Support";
import SystemControl from "../components/admin/SystemControl";
import VehicleList from "../components/admin/VehicleList";
import BookingList from "../components/admin/BookingList";
import AddVehicleForm from "../components/admin/AddVehicleForm";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);

  useEffect(() => {
    const savedTab = localStorage.getItem("adminActiveTab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("adminActiveTab", tab);
  };

  const handleAddVehicle = async (vehicleData) => {
    try {
      console.log("🚗 Adding new vehicle:", vehicleData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicles`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicleData),
        }
      );

      if (!response.ok) throw new Error("Failed to add vehicle");

      setShowAddVehicleForm(false);
      toast.success("✅ Vehicle added successfully!");
    } catch (error) {
      console.error("❌ Error adding vehicle:", error);
      toast.error("Failed to add vehicle.");
    }
  };

  const tabs = [
    { id: "users", label: "Users" },
    { id: "transactions", label: "Transactions" },
    { id: "reports", label: "Reports" },
    { id: "support", label: "Support" },
    { id: "system", label: "System Control" },
    { id: "vehicles", label: "Vehicles" },
    { id: "bookings", label: "Bookings" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6 pt-28 transition-all duration-300">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold text-center p-4">
        Admin Dashboard
      </h1>

      {/* Navigation Tabs */}
      <div className="bg-[var(--section-bg)] flex justify-center gap-3 p-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 
          ${
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700"
          }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      <div className="bg-[var(--section-bg)] p-6 rounded-lg shadow-md transition-all duration-300">
        {activeTab === "users" && <UsersManagement />}
        {activeTab === "transactions" && <Transactions />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "support" && <Support />}
        {activeTab === "system" && <SystemControl />}
        {activeTab === "vehicles" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Vehicle List</h2>
              <button
                onClick={() => setShowAddVehicleForm(!showAddVehicleForm)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all duration-300"
              >
                {showAddVehicleForm ? "Close Form" : "Add Vehicle"}
              </button>
            </div>
            {showAddVehicleForm && (
              <AddVehicleForm addVehicle={handleAddVehicle} />
            )}
            <VehicleList />
          </>
        )}
        {activeTab === "bookings" && <BookingList />}
      </div>
    </div>
  );
}

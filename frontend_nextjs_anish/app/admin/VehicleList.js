"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

const VehicleList = ({ vehicles, updateVehicle, deleteVehicle }) => {
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Group vehicles by category
  const groupedVehicles = vehicles.reduce((acc, vehicle) => {
    const category = vehicle.type || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(vehicle);
    return acc;
  }, {});

  // Handle clicking the Edit button
  const handleEditClick = (vehicle) => {
    setEditingVehicle(vehicle._id); // Ensure correct ID usage
    setUpdatedData({ ...vehicle });
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle vehicle update
  const handleUpdateSubmit = async (e, vehicleId) => {
    e.preventDefault();

    if (
      !updatedData.brand ||
      !updatedData.model ||
      !updatedData.price_per_day
    ) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);
    try {
      await updateVehicle(vehicleId, updatedData);
      toast.success("Vehicle updated successfully!");
      setEditingVehicle(null);
    } catch (error) {
      toast.error("Error updating vehicle.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle vehicle deletion
  const handleDeleteClick = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;

    setIsLoading(true);
    try {
      await deleteVehicle(vehicleId);
      toast.success("Vehicle deleted successfully!");
    } catch (error) {
      toast.error("Error deleting vehicle.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        All Vehicles
      </h2>

      {/* Dropdown for vehicle category selection */}
      <select
        className="mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
        onChange={(e) => setSelectedCategory(e.target.value || "")}
      >
        <option value="">All Vehicles</option>
        <option value="Car">Cars</option>
        <option value="Bike">Bikes</option>
        <option value="Scooty">Scooties</option>
        <option value="Truck">Trucks</option>
        <option value="SUV">SUVs</option>
        <option value="Other">Others</option>
      </select>

      {/* Display vehicles by selected category */}
      {Object.keys(groupedVehicles)
        .filter((category) =>
          selectedCategory ? category === selectedCategory : true
        )
        .map((category, categoryIndex) => (
          <div key={category || `category-${categoryIndex}`} className="mb-6">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
              {category}
            </h3>
            <ul className="space-y-4">
              {groupedVehicles[category].map((vehicle, vehicleIndex) => (
                <li
                  key={
                    vehicle._id || `vehicle-${categoryIndex}-${vehicleIndex}`
                  }
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {editingVehicle === vehicle._id ? (
                    <form
                      onSubmit={(e) => handleUpdateSubmit(e, vehicle._id)}
                      className="space-y-2"
                    >
                      <input
                        type="text"
                        name="brand"
                        value={updatedData.brand || ""}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Brand"
                        required
                      />
                      <input
                        type="text"
                        name="model"
                        value={updatedData.model || ""}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Model"
                        required
                      />
                      <input
                        type="number"
                        name="price_per_day"
                        value={updatedData.price_per_day || ""}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Price per day"
                        required
                      />
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingVehicle(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="text-gray-800 dark:text-white">
                        <strong>
                          {vehicle.brand} {vehicle.model}
                        </strong>{" "}
                        - ${vehicle.price_per_day}/day
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditClick(vehicle)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(vehicle._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default VehicleList;

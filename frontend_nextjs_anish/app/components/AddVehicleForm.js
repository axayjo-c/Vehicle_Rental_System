import { useState } from "react";

const AddVehicleForm = ({ setShowForm }) => {
  const [newVehicle, setNewVehicle] = useState({
    type: "",
    brand: "",
    model: "",
    price_per_day: "",
    availability: "",
    registration_number: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return (
      newVehicle.type &&
      newVehicle.brand &&
      newVehicle.model &&
      newVehicle.price_per_day &&
      newVehicle.availability &&
      newVehicle.registration_number
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatusMessage("All fields are required.");
      return;
    }

    const vehicleData = {
      type: newVehicle.type,
      brand: newVehicle.brand,
      model: newVehicle.model,
      price_per_day: newVehicle.price_per_day,
      availability: newVehicle.availability,
      registration_number: newVehicle.registration_number,
    };

    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicles`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleData),
        }
      );

      const text = await response.text();
      console.log("Raw Response Text:", text);

      if (response.ok) {
        try {
          const responseBody = JSON.parse(text);
          console.log("Parsed Response Body:", responseBody);
          setStatusMessage(
            responseBody.message || "Vehicle added successfully"
          );
          setShowForm(false);
        } catch (err) {
          console.error("Error parsing JSON:", err);
          setStatusMessage("Failed to parse response from the server.");
        }
      } else {
        console.error("Non-OK Response:", text);
        setStatusMessage("Failed to add vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setStatusMessage("An error occurred while adding the vehicle.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Add a New Vehicle
      </h3>
      <div className="space-y-2">
        <input
          type="text"
          name="type"
          value={newVehicle.type}
          onChange={handleInputChange}
          placeholder="Vehicle Type"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="brand"
          value={newVehicle.brand}
          onChange={handleInputChange}
          placeholder="Brand"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="model"
          value={newVehicle.model}
          onChange={handleInputChange}
          placeholder="Model"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          name="price_per_day"
          value={newVehicle.price_per_day}
          onChange={handleInputChange}
          placeholder="Price per day"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="availability"
          value={newVehicle.availability}
          onChange={handleInputChange}
          placeholder="Availability (Available/Unavailable)"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="registration_number"
          value={newVehicle.registration_number}
          onChange={handleInputChange}
          placeholder="Registration Number"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Display status message */}
      {statusMessage && (
        <div
          className={`mt-4 p-3 text-center rounded-md ${
            statusMessage.includes("success")
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Add Vehicle
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddVehicleForm;

import { useState } from "react";
import { toast } from "react-hot-toast";

const AddVehicleForm = ({ setShowForm }) => {
  const [newVehicle, setNewVehicle] = useState({
    type: "",
    brand: "",
    model: "",
    price_per_day: "",
    availability: "",
    registration_number: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(newVehicle).every((val) => val.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicles`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVehicle),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add vehicle.");
      }

      const data = await response.json();
      toast.success(data.message || "Vehicle added successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error("An error occurred while adding the vehicle.");
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

      {/* Form Fields */}
      {[
        "type",
        "brand",
        "model",
        "price_per_day",
        "availability",
        "registration_number",
      ].map((field) => (
        <input
          key={field}
          type={field === "price_per_day" ? "number" : "text"}
          name={field}
          value={newVehicle[field]}
          onChange={handleInputChange}
          placeholder={field.replace("_", " ").toUpperCase()}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
      ))}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`py-2 px-4 rounded-lg text-white transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Adding..." : "Add Vehicle"}
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

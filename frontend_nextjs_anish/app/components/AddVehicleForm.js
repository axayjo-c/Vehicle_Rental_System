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
    if (
      !newVehicle.type ||
      !newVehicle.brand ||
      !newVehicle.model ||
      !newVehicle.registration_number
    ) {
      toast.error("All fields are required.");
      return false;
    }

    if (isNaN(newVehicle.price_per_day) || newVehicle.price_per_day <= 0) {
      toast.error("Price per day must be a positive number.");
      return false;
    }

    if (!["yes", "no"].includes(newVehicle.availability.toLowerCase())) {
      toast.error('Availability must be "yes" or "no".');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.warn("⚠️ Form validation failed: All fields are required.");
      toast.error("All fields are required.");
      return;
    }

    setIsLoading(true);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicles`;
    const token = localStorage.getItem("token");

    console.log("🔍 API Request Debugging:");
    console.log("➡️ API URL:", apiUrl);
    console.log("📦 Request Payload:", JSON.stringify(newVehicle, null, 2));
    console.log("🔑 Authorization Token:", token ? "Present" : "Missing");

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newVehicle),
        mode: "cors",
      });

      console.log("📨 Response Status:", response.status);
      console.log("📩 Response Headers:", [...response.headers]);

      // Try parsing JSON response
      let data;
      const rawText = await response.text();
      console.log("📜 Raw API Response:", rawText);

      try {
        data = JSON.parse(rawText);
      } catch (jsonError) {
        console.warn("⚠️ Response is not JSON. Using raw text instead.");
        data = { message: rawText };
      }

      console.log("📩 Parsed API Response:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        console.error(
          "❌ API Error:",
          data.message || "Failed to add vehicle."
        );
        throw new Error(data.message || "Failed to add vehicle.");
      }

      toast.success(data.message || "Vehicle added successfully!");
      console.log("✅ Vehicle added successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error adding vehicle:", error.message);
      toast.error(
        error.message || "An error occurred while adding the vehicle."
      );
    } finally {
      console.log("🔄 Request Completed.");
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
        { name: "type", label: "Vehicle Type" },
        { name: "brand", label: "Brand" },
        { name: "model", label: "Model" },
        { name: "price_per_day", label: "Price Per Day (₹)", type: "number" },
        { name: "availability", label: "Availability (yes/no)" },
        { name: "registration_number", label: "Registration Number" },
      ].map(({ name, label, type = "text" }) => (
        <input
          key={name}
          type={type}
          name={name}
          value={newVehicle[name]}
          onChange={handleInputChange}
          placeholder={label}
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

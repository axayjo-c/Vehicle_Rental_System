import { useState } from "react";

const AddVehicleForm = ({ setIsAdding }) => {
  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    price_per_day: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Vehicle Added:", newVehicle);
    setIsAdding(false);
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
          name="brand"
          value={newVehicle.brand}
          onChange={handleInputChange}
          placeholder="Brand"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="model"
          value={newVehicle.model}
          onChange={handleInputChange}
          placeholder="Model"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="price_per_day"
          value={newVehicle.price_per_day}
          onChange={handleInputChange}
          placeholder="Price per day"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="image_url"
          value={newVehicle.image_url}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Add Vehicle
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddVehicleForm;

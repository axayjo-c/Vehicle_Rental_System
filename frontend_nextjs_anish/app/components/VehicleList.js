// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function VehicleList() {
//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`)
//       .then((res) => res.json())
//       .then((data) => setVehicles(data));
//   }, []);

//   const deleteVehicle = (id) => {
//     fetch(`/api/vehicles/${id}`, { method: "DELETE" }).then(() =>
//       setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
//     );
//   };

//   const updateVehicle = (id) => {
//     window.location.href = `/admin/edit-vehicle/${id}`;
//   };

//   const renderVehicles = (type) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {vehicles
//         .filter((v) => v.type === type)
//         .map((vehicle) => (
//           <div
//             key={vehicle.id}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between"
//           >
//             <Image
//               src={vehicle.image_url}
//               alt={vehicle.model}
//               width={300}
//               height={200}
//               className="w-full h-32 object-cover rounded-md mb-2"
//               priority
//               unoptimized
//             />
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//               {vehicle.brand} {vehicle.model}
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300">
//               {vehicle.price_per_day}
//             </p>
//             <div className="flex justify-between mt-2">
//               <button
//                 onClick={() => updateVehicle(vehicle.id)}
//                 className="text-blue-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteVehicle(vehicle.id)}
//                 className="text-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//     </div>
//   );

//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//         All Vehicles
//       </h2>

//       {/* Scooties Section */}
//       <h3 className="text-lg font-semibold mt-4 mb-2">Scooties</h3>
//       {renderVehicles("Scooty")}

//       {/* Bikes Section */}
//       <h3 className="text-lg font-semibold mt-4 mb-2">Bikes</h3>
//       {renderVehicles("Bike")}

//       {/* Cars Section */}
//       <h3 className="text-lg font-semibold mt-4 mb-2">Cars</h3>
//       {renderVehicles("Car")}
//     </div>
//   );
// }

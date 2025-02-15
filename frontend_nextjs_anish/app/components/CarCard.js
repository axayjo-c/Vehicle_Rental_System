import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-black dark:text-gray-200 transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <Image
        src={car.img}
        width={400}
        height={250}
        alt={car.name}
        className="rounded-lg shadow-md object-cover w-full h-48"
        priority
      />

      {/* Car Details */}
      <h3 className="text-xl font-semibold mt-4">{car.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{car.price}</p>

      {/* View Details Button (Pinned to Bottom) */}
      <div className="mt-auto">
        <Link href="/cars">
          <button className="btn-primary mt-4 w-full">View Details</button>
        </Link>
      </div>
    </div>
  );
}

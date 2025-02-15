/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Clock,
  Shield,
  ChevronRight,
  Star,
  Users,
  HelpCircle,
} from "lucide-react";

function FAQItem({ question, answer }) {
  return (
    <div className="p-4 border rounded-lg bg-[var(--section-bg)] shadow-md">
      <div className="flex items-center gap-3">
        <HelpCircle className="text-[var(--btn-bg)] w-6 h-6" />
        <h3 className="text-lg font-semibold">{question}</h3>
      </div>
      <p className="text-[var(--text-muted)] mt-2">{answer}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* 🚗 Hero Section */}
      <section className="relative w-full text-center py-20 px-6 bg-[var(--section-bg)] shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-extrabold sm:text-6xl leading-tight drop-shadow-lg">
            Rent Your Dream Car, <br /> Drive With Confidence
          </h1>
          <p className="text-lg text-[var(--text-muted)] mt-4">
            Premium car rentals for every journey – easy, affordable, and
            reliable.
          </p>
          <Link href="/cars">
            <button
              className="btn-primary mt-6 flex items-center gap-2"
              aria-label="Explore Cars"
            >
              Explore Cars <ChevronRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* 🏆 Features Section */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "Car",
            title: "Wide Range of Cars",
            description:
              "Choose from premium & economy cars for every occasion.",
          },
          {
            icon: "Clock",
            title: "Fast & Easy Booking",
            description:
              "Book your vehicle in minutes with our seamless online process.",
          },
          {
            icon: "Shield",
            title: "Secure Payments",
            description:
              "Hassle-free transactions with multiple payment options.",
          },
        ].map(({ icon, title, description }, index) => (
          <FeatureCard
            key={index}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </section>

      {/* 🚘 Car Showcase Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center">Popular Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {[
            // Sample Data (Replace with API data)
            {
              name: "Tesla Model 3",
              price: "₹5,500/day",
              img: "/cars/tesla.jpg",
            },
            {
              name: "Mercedes-Benz G-Class",
              price: "₹15,000/day",
              img: "/cars/mercedes.jpg",
            },
            { name: "BMW X5", price: "₹10,000/day", img: "/cars/bmw.jpg" },
          ].map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </section>

      {/* ⭐ Testimonials Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center bg-[var(--section-bg)] rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              name: "Amit Sharma",
              review: "Fantastic service! The car was in perfect condition.",
              rating: 5,
            },
            {
              name: "Priya Verma",
              review: "Smooth booking process and great prices!",
              rating: 4,
            },
            {
              name: "Rahul Mehta",
              review: "Loved the experience! Will rent again.",
              rating: 5,
            },
          ].map((review, index) => (
            <TestimonialCard key={index} review={review} />
          ))}
        </div>
      </section>

      {/* ❓ FAQ Section */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-6">
          {[
            {
              question: "What documents do I need to rent a car?",
              answer:
                "You need a valid driver's license, ID proof, and a credit card for security deposit.",
            },
            {
              question: "Is there a mileage limit?",
              answer:
                "Yes, mileage limits depend on the selected plan. Extra charges may apply for exceeding the limit.",
            },
            {
              question: "What happens if I return the car late?",
              answer:
                "Late returns may incur additional charges. Please check the rental terms for details.",
            },
          ].map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </section>

      {/* 🚀 Call to Action */}
      <section className="max-w-5xl mx-auto py-12 px-6 text-center bg-[var(--section-bg)] rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Ready to Hit the Road?</h2>
        <p className="text-lg text-[var(--text-muted)] mt-2">
          Book your rental car now and start your journey with ease.
        </p>
        <Link href="/cars">
          <button className="btn-primary mt-6">Book Now</button>
        </Link>
      </section>
    </main>
  );
}

/* 🏗️ Reusable Components */
function FeatureCard({ icon, title, description }) {
  const IconComponent = { Car, Clock, Shield }[icon] || Car;
  return (
    <div className="flex flex-col items-center">
      <IconComponent className="text-[var(--btn-bg)] w-12 h-12 mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-[var(--text-muted)] mt-2">{description}</p>
    </div>
  );
}

function CarCard({ car }) {
  return (
    <div className="card p-4">
      <Image
        src={car.img}
        width={400}
        height={250}
        alt={car.name}
        className="rounded-lg shadow-md"
        priority
      />
      <h3 className="text-xl font-semibold mt-4">{car.name}</h3>
      <p className="text-[var(--text-muted)]">{car.price}</p>
      <Link href="/cars">
        <button className="btn-primary mt-4 w-full">View Details</button>
      </Link>
    </div>
  );
}

function TestimonialCard({ review }) {
  return (
    <div className="card p-4 text-center">
      <Users className="text-[var(--btn-bg)] w-10 h-10 mx-auto mb-3" />
      <p className="text-lg font-semibold">{review.name}</p>
      <p className="text-[var(--text-muted)] mt-2">"{review.review}"</p>
      <div className="flex justify-center mt-2">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="text-yellow-500 w-5 h-5" />
        ))}
      </div>
    </div>
  );
}

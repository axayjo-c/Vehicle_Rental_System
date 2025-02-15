"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Affordable Pricing Plans</h1>
        <p className="text-lg text-[var(--text-muted)] mt-3">
          Choose the perfect rental plan that suits your needs.
        </p>
      </div>

      {/* 💰 Pricing Plans */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <PricingCard
          title="Basic Plan"
          price="₹2,500/day"
          features={[
            "Economy Cars",
            "100 KM Free",
            "Basic Insurance",
            "24/7 Support",
          ]}
          buttonText="Choose Basic"
        />
        <PricingCard
          title="Standard Plan"
          price="₹5,500/day"
          features={[
            "Sedan & SUVs",
            "200 KM Free",
            "Standard Insurance",
            "Priority Support",
          ]}
          highlighted
          buttonText="Choose Standard"
        />
        <PricingCard
          title="Premium Plan"
          price="₹10,000/day"
          features={[
            "Luxury & Sports Cars",
            "Unlimited KM",
            "Full Insurance",
            "VIP Support",
          ]}
          buttonText="Choose Premium"
        />
      </div>

      {/* 📞 Contact for Custom Plans */}
      <div className="max-w-5xl mx-auto text-center mt-12">
        <p className="text-lg text-[var(--text-muted)]">
          Need a custom rental plan? Contact us for a tailored package.
        </p>
        <Link href="/contact">
          <button className="btn-primary mt-4">Contact Us</button>
        </Link>
      </div>
    </main>
  );
}

/* 📌 Reusable Pricing Card Component */
function PricingCard({ title, price, features, highlighted, buttonText }) {
  return (
    <div
      className={`p-6 border rounded-lg shadow-md ${
        highlighted
          ? "bg-[var(--btn-bg)] text-white scale-105"
          : "bg-[var(--section-bg)]"
      }`}
    >
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <p className="text-xl font-semibold text-center mt-2">{price}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`mt-6 w-full btn-primary ${
          highlighted ? "bg-white text-[var(--btn-bg)]" : ""
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

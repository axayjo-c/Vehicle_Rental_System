"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

// Dummy Data (Can be fetched from API)
const defaultUser = {
  username: "John Doe",
  email: "john@example.com",
  profilePic: "",
};

const defaultBookings = [
  { id: 1, vehicle: "Tesla Model 3", date: "2025-02-20" },
  { id: 2, vehicle: "Yamaha R15", date: "2025-02-18" },
];

const defaultTransactions = [
  { id: 1, amount: "$120", status: "Completed" },
  { id: 2, amount: "$80", status: "Pending" },
];

const defaultReviews = [
  { id: 1, text: "Great ride! Smooth experience.", date: "2025-02-21" },
];

export default function Dashboard() {
  const [user, setUser] = useState(defaultUser);
  const [bookings, setBookings] = useState(defaultBookings);
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [reviews, setReviews] = useState(defaultReviews);

  // Memoized computed values
  const hasBookings = useMemo(() => bookings.length > 0, [bookings]);
  const hasTransactions = useMemo(
    () => transactions.length > 0,
    [transactions]
  );
  const hasReviews = useMemo(() => reviews.length > 0, [reviews]);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold text-center mb-4">
        User Dashboard
      </h1>

      {/* Profile Section */}
      <div className="bg-[var(--card-bg)] shadow-lg p-6 rounded-xl flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <Avatar name={user.username} profilePic={user.profilePic} />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-[var(--text-muted)]">{user.email}</p>
          <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
            <Button className="bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover)]">
              Edit Profile
            </Button>
            <Button className="bg-red-600 text-white hover:bg-red-700">
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Booking History */}
      <Section title="Booking History">
        {hasBookings ? (
          <List
            items={bookings}
            renderItem={(booking) => (
              <li
                key={booking.id}
                className="flex justify-between border-b pb-2 transition hover:bg-[var(--hover-bg)] p-2 rounded-lg"
              >
                <span>{booking.vehicle}</span>
                <span className="text-sm text-[var(--text-muted)]">
                  {booking.date}
                </span>
              </li>
            )}
          />
        ) : (
          <NoData message="No bookings found." />
        )}
      </Section>

      {/* Transactions History */}
      <Section title="Transaction History">
        {hasTransactions ? (
          <List
            items={transactions}
            renderItem={(txn) => (
              <li
                key={txn.id}
                className="flex justify-between border-b pb-2 transition hover:bg-[var(--hover-bg)] p-2 rounded-lg"
              >
                <span>{txn.amount}</span>
                <span
                  className={`text-sm font-semibold ${
                    txn.status === "Completed"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {txn.status}
                </span>
              </li>
            )}
          />
        ) : (
          <NoData message="No transactions found." />
        )}
      </Section>

      {/* Review Section */}
      <Section title="Your Reviews">
        {hasReviews ? (
          <List
            items={reviews}
            renderItem={(review) => (
              <li
                key={review.id}
                className="border-b pb-2 transition hover:bg-[var(--hover-bg)] p-2 rounded-lg"
              >
                <p>{review.text}</p>
                <div className="flex justify-between items-center text-sm text-[var(--text-muted)] mt-1">
                  <span>{review.date}</span>
                  <div className="flex gap-3">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            )}
          />
        ) : (
          <NoData message="No reviews found." />
        )}
        <Button className="mt-4 bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover)]">
          Add Review
        </Button>
      </Section>
    </div>
  );
}

/* Avatar Component (Shows initials if no profile pic) */
function Avatar({ name, profilePic }) {
  if (profilePic) {
    return (
      <Image
        src={profilePic}
        alt="Profile Picture"
        width={100}
        height={100}
        className="rounded-full border border-[var(--border-color)]"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700 text-white text-3xl font-bold border border-gray-500">
      {initials}
    </div>
  );
}

/* Reusable Section Wrapper */
function Section({ title, children }) {
  return (
    <div className="bg-[var(--card-bg)] shadow-lg p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

/* Generic List Component */
function List({ items, renderItem }) {
  return <ul className="space-y-3">{items.map(renderItem)}</ul>;
}

/* No Data Message */
function NoData({ message }) {
  return <p className="text-[var(--text-muted)] text-center">{message}</p>;
}

/* Reusable Button Component */
function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

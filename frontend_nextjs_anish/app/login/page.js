"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    console.group("🔹 Login Attempt");
    console.log(
      "🌐 API Endpoint:",
      `${process.env.NEXT_PUBLIC_API_URL}/do-login`
    );

    if (!username || !password) {
      console.error("⚠️ Error: Username or password is empty.");
      setErrorMessage("Username and password are required.");
      setIsLoading(false);
      console.groupEnd();
      return;
    }

    // Encode username and password in Base64 for Basic Auth
    const credentials = btoa(`${username}:${password}`);
    console.log("🔑 Encoded Credentials: [HIDDEN] "); // Do not log credentials in production
    console.log(credentials);

    try {
      console.log("📤 Sending login request...");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/do-login`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📥 Response received. Status:", response.status);

      if (response.ok) {
        const token = await response.text();
        console.log("✅ Login Successful. Token received:", token);

        // Store the token in localStorage
        localStorage.setItem("token", token);
        console.log("💾 Token saved in localStorage.");

        console.log("🔄 Redirecting to home page...");
        router.push("/");
      } else {
        console.warn("⚠️ Login Failed. Status:", response.status);

        const errorText = await response.text();
        console.warn("⚠️ Server Response:", errorText);
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("❌ Network or Server Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      console.log("🔚 Login Attempt Finished.");
      console.groupEnd();
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center mb-4">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

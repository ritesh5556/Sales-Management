import React, { useState } from "react";
import toast from "react-hot-toast";

const SeedDataButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeedData = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/transaction/initialize`, {
        method: "GET",
      });

      if (response.ok) {
        toast.success("Data seeded successfully!");
      } else {
        toast.error("Failed to seed data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSeedData}
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {loading ? "Seeding Data..." : "Seed Data"}
      </button>
      {/* {message && <p className="mt-2 text-sm">{message}</p>} */}
    </div>
  );
};

export default SeedDataButton;

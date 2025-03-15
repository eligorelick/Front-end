import React from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-600">
          Find Top Freelancers
        </h1>
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Search for services..."
            className="w-1/2 p-3 border rounded-lg shadow"
          />
          <button className="ml-2 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

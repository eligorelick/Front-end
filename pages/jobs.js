import React from "react";
import { FaBriefcase } from "react-icons/fa";

const JobListings = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {[1, 2, 3].map((job) => (
          <div
            key={job}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Job Title {job}
            </h3>
            <p className="text-gray-600">Job Description for job {job}</p>
            <p className="text-gray-700 font-bold mt-2">Price: {job * 2} Pi</p>
            <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center">
              <FaBriefcase className="mr-2" /> Apply & Pay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;

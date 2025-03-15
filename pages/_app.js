import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaUser, FaBriefcase } from "react-icons/fa";
import "../styles/globals.css"; // Ensure Tailwind CSS is imported

const Navbar = () => {
  return (
    <nav className="p-4 bg-white shadow flex justify-between">
      <Link href="/" className="text-xl font-bold text-blue-600">
        FreelanceHub
      </Link>
      <div>
        <Link href="/jobs" className="mr-4 flex items-center">
          <FaBriefcase className="mr-1" /> Jobs
        </Link>
        <Link href="/profile" className="mr-4 flex items-center">
          <FaUser className="mr-1" /> Profile
        </Link>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </div>
    </nav>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

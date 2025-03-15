import React, { useState } from "react";
import axios from "axios";
import { authenticateWithPi } from "../utils/piAuth"; // Ensure Pi authentication works

const JobPostForm = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePostJob = async () => {
        setLoading(true);
        const user = await authenticateWithPi();

        if (!user) {
            alert("❌ Authentication failed. Please log in with Pi.");
            setLoading(false);
            return;
        }

        try {
            // **Step 1: Process Pi Payment**
            const paymentResponse = await axios.post("http://localhost:5000/api/pay-for-job", {
                uid: user.uid,
            });

            if (!paymentResponse.data.success) {
                alert("❌ Payment failed. Job post not submitted.");
                setLoading(false);
                return;
            }

            // **Step 2: Submit the job posting**
            const jobResponse = await axios.post("http://localhost:5000/api/jobs", {
                title: jobTitle,
                description: jobDescription,
                postedBy: user.uid, // Store who posted the job
            });

            if (jobResponse.data.success) {
                alert("✅ Job posted successfully!");
            } else {
                alert("❌ Failed to post job.");
            }
        } catch (error) {
            console.error("❌ Error posting job:", error);
            alert("❌ An error occurred.");
        }

        setLoading(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Post a Job (1 Pi Fee)</h2>
            <input
                type="text"
                placeholder="Job Title"
                className="w-full p-2 border rounded mt-2"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
            />
            <textarea
                placeholder="Job Description"
                className="w-full p-2 border rounded mt-2"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />
            <button
                className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                onClick={handlePostJob}
                disabled={loading}
            >
                {loading ? "Processing Payment..." : "Pay 1 Pi & Post Job"}
            </button>
        </div>
    );
};

export default JobPostForm;

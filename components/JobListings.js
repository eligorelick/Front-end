import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { startPiPayment } from '../utils/piPayment';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const jobsCollection = await getDocs(collection(db, "jobs"));
            setJobs(jobsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchJobs();
    }, []);

    const handleApply = async (jobId, jobPrice) => {
        const piPaymentResult = await startPiPayment(jobPrice);
        
        if (piPaymentResult.success) {
            alert("Payment successful! Job application submitted.");
            await updateDoc(doc(db, "jobs", jobId), { status: "In Progress" });
        } else {
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Available Jobs</h2>
            {jobs.length === 0 ? <p>No jobs available.</p> : (
                <ul>
                    {jobs.map(job => (
                        <li key={job.id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                            <p><strong>Price:</strong> {job.price} Pi</p>
                            <button onClick={() => handleApply(job.id, job.price)}>Apply & Pay</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobListings;

import { useEffect, useState } from 'react';
import PiPayment from '../components/PiPayment';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('piUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchJobs(JSON.parse(storedUser));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchJobs = async (user) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    setJobs(data.jobs);
    setLoading(false);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🛠️ Available Jobs</h1>

      {selectedJob ? (
        <div>
          <h2>{selectedJob.title}</h2>
          <p>{selectedJob.description}</p>
          <PiPayment amount={selectedJob.amount} jobId={selectedJob.id} workerId={user.username} />
          <button onClick={() => setSelectedJob(null)}>Back to jobs list</button>
        </div>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button onClick={() => handleJobSelect(job)}>Pay & Hire</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('piUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <h1>👤 Profile Page</h1>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
}

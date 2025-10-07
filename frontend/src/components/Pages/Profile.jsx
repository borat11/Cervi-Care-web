import React from 'react'
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Welcome, {user.name}
      </h2>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default Profile;

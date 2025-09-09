import React, { useEffect, useState } from "react";
import StudentService from "../services/ProfileService";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await StudentService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>No profile found.</p>;
  }

  return (
    <div className="card shadow p-4">
      <h3 className="mb-3">My Profile</h3>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
    </div>
  );
}

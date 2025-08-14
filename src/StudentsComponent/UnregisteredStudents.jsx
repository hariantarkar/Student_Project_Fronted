// src/components/UnregisteredStudents.jsx
import React, { useEffect, useState } from "react";
import { getUnregisteredStudents } from "../services/studentService";

const UnregisteredStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getUnregisteredStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message || "Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Unregistered Students</h2>
      {students.length === 0 ? (
        <p>No unregistered students found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.uid}>
                <td>{student.uid}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UnregisteredStudents;

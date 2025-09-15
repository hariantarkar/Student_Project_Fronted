import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:9999/courses", {
          withCredentials: true,
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (courses.length === 0) return <p>No enrolled courses found.</p>;

  return (
    <div className="card shadow p-4 mt-5">
      <h3 className="mb-3">My Course</h3>
      <ul className="list-group">
        {courses.map((c) => (
          <li key={c.cid} className="list-group-item">{c.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPerformance } from "../services/PerformanceService";

export default function ViewPerformance() {
  const [performanceData, setPerformanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const data = await getAllPerformance();
      setPerformanceData(data || []);
      setFilteredData(data || []);
    } catch (err) {
      console.error("Error fetching performance:", err);
      setError("Failed to fetch performance data");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = performanceData.filter(
      (p) =>
        p.name.toLowerCase().includes(value) ||
        p.email.toLowerCase().includes(value) ||
        p.course_name.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Students Performance</h3>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3 text-end">
        <input
          type="text"
          className="form-control w-100 d-inline-block"
          placeholder="Search by name, email, or course"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center table-hover">
          <thead className="table-dark">
            <tr>
              <th>SID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Course</th>
              <th>Attendance</th>
              <th>Machine Test</th>
              <th>MCQ</th>
              <th>Mock Interview</th>
              <th>Final Score</th>
              <th>Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((p) => (
                <tr key={p.per_id}>
                  <td>{p.sid}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.contact}</td>
                  <td>{p.course_name}</td>
                  <td>{p.attendance_percentage}</td>
                  <td>{p.machine_test}</td>
                  <td>{p.mcq_test}</td>
                  <td>{p.mock_interview_score}</td>
                  <td>{p.final_score}</td>
                  <td>{p.percentage}%</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        navigate(`/admin/dashboard/performance/update/${p.sid}`)
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No performance data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getConfirmedStudents } from "../services/PerformanceService";
import { useNavigate } from "react-router-dom";

export default function ViewConfirmedStudents() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchConfirmedStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.course_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [search, students]);

  const fetchConfirmedStudents = async () => {
    try {
      const data = await getConfirmedStudents();
      setStudents(data || []);
      setFilteredStudents(data || []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch confirmed students");
    }
  };

  return (
    <div className="container mt-0">
      <h3 className="mb-3 text-center">Confirmed Students (For Performance)</h3>

      {error && <p className="text-danger">{error}</p>}


      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div
        className="table-responsive"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <table className="table table-bordered text-center table-hover">
          <thead className="table-dark" style={{ position: "sticky", top: 0 }}>
            <tr>
              <th>SR NO</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Contact</th> */}
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s,index) => (
                <tr key={s.sid}>
                  <td>{index+1}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  {/* <td>{s.contact}</td> */}
                  <td>{s.course_name}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`../add/${s.sid}`)}
                    >
                      Add Performance
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No confirmed students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

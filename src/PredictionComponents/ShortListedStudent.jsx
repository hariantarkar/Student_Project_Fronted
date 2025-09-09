import React, { useEffect, useState } from "react";
import { getShortlistedPredictions } from "../services/PredictionService";
import "./ShortListedStudent.css";

export default function Shortlisted() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const studentsPerPage = 5;

  useEffect(() => {
    const fetchShortlisted = async () => {
      try {
        const response = await getShortlistedPredictions();
        setStudents(response.data);
      } catch (err) {
        setError(err.message || "Failed to load shortlisted students");
      }
    };
    fetchShortlisted();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.readiness_level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="shortlisted-card">
      <div className="header-row">
        <h3>Shortlisted Students</h3>
        <input type="text" placeholder="Search by Name, Email, Readiness..."
          value={searchTerm} onChange={(e) => {
            setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="search-bar"/>
      </div>

      {error && <p className="error-text">{error}</p>}

      <table className="shortlisted-table">
        <thead>
          <tr>
            <th>SR NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Readiness</th>
            <th>Suggestion</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((s, idx) => (
            <tr key={idx}>
              <td>{indexOfFirstStudent + idx + 1}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.readiness_level}</td>
              <td>{s.suggestion}</td>
              <td>{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}>◀ Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} className={currentPage === i + 1 ? "active" : ""}
            onClick={() => goToPage(i + 1)}>{i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}>Next ▶
        </button>
      </div>
    </div>
  );
}

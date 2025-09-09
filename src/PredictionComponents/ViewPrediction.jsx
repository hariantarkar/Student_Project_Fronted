import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../services/PredictionService";

export default function ViewPrediction() {
  const [predictionData, setPredictionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const data = await getAllPredictions();
      setPredictionData(data || []);
      setFilteredData(data || []);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Failed to fetch prediction data");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = predictionData.filter(
      (p) =>
        (p.readiness_level && p.readiness_level.toLowerCase().includes(value)) ||
        (p.sid && String(p.sid).includes(value)) ||
        (p.shortlisted !== null && String(p.shortlisted).includes(value)) ||
        (p.suggestion && p.suggestion.toLowerCase().includes(value)) ||
        (p.name && p.name.toLowerCase().includes(value)) ||
        (p.email && p.email.toLowerCase().includes(value))
    );

    setFilteredData(filtered);
  };

  return (
    <div className="container mt-0">
      <h3 className="mb-2 text-center">Students Predictions</h3>
      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3 text-end">
        <input type="text" className="form-control w-100 d-inline-block"
          placeholder="Search by name, email, readiness level, shortlisted or suggestion"
          value={search} onChange={handleSearch}/>
      </div>

      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-bordered text-center align-middle table-hover">
          <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th>SR NO</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Readiness Level</th>
              <th>Shortlisted</th>
              <th>Suggestion</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((p, index) => (
                <tr key={p.pre_id || index}>
                  <td>{index + 1}</td>
                  <td>{p.name || "-"}</td>
                  <td>{p.email || "-"}</td>
                  <td>{p.readiness_level || "-"}</td>
                  <td>{p.shortlisted === 1 ? "Yes" : "No"}</td>
                  <td>{p.suggestion || "-"}</td>
                  <td>
                    {p.created_at
                      ? new Date(p.created_at).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "short",
                          timeStyle: "medium",
                        })
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No prediction data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

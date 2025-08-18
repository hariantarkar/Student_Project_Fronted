import React, { useState } from "react";
import { addPerformance } from "../services/performanceService"; 
import "./PerformanceAdd.css";

export default function PerformanceAdd() {
  const [formData, setFormData] = useState({
    sid: "",
    attendance_percentage: "",
    machine_test: "",
    mcq_test: "",
    mock_interview_score: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await addPerformance(formData);
      setMessage(res.message || "Performance added successfully");
      setFormData({
        sid: "",
        attendance_percentage: "",
        machine_test: "",
        mcq_test: "",
        mock_interview_score: "",
      });

      setTimeout(() => {
    setMessage("");
  }, 3000);
    } catch (err) {
      setMessage(err.message || "Error adding performance");

      setTimeout(() => {
    setMessage("");
  }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perf-container">
      <div className="perf-card">
        <h3 className="text-center">Add Student Performance</h3>

        {message && <div className="alert">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Student ID</label>
            <input type="number" name="sid" value={formData.sid} onChange={handleChange}
              className="form-control" placeholder="Enter Student ID" required/>
          </div>

          <div className="mb-3">
            <label>Attendance (0-10)</label>
            <input type="number" name="attendance_percentage" value={formData.attendance_percentage}
              onChange={handleChange} className="form-control" min="0" max="10" required/>
          </div>

          <div className="mb-3">
            <label>Machine Test (0-10)</label>
            <input type="number" name="machine_test" value={formData.machine_test}onChange={handleChange}
              className="form-control" min="0" max="10" required/>
          </div>

          <div className="mb-3">
            <label>MCQ Test (0-10)</label>
            <input type="number" name="mcq_test" value={formData.mcq_test} onChange={handleChange}
              className="form-control" min="0" max="10" required/>
          </div>

          <div className="mb-3">
            <label>Mock Interview (0-10)</label>
            <input type="number" name="mock_interview_score" value={formData.mock_interview_score} onChange={handleChange}
              className="form-control" min="0" max="10" required/>
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Submitting..." : "Add Performance"}
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { addPerformance } from "../services/PerformanceService";
import { useParams ,useNavigate } from "react-router-dom";   
import "./PerformanceAdd.css";
import { validateScore } from "../Validations/PerformanceAddValid";  

export default function PerformanceAdd() {
  const { sid } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sid: sid || "",
    attendance_percentage: "",
    machine_test: "",
    mcq_test: "",
    mock_interview_score: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ text: "", type: "" });

    validateScore(e.target.value, `${e.target.name}_err`, e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    if (!formData.sid) {
      setMessage({ text: "Student ID missing.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const res = await addPerformance(formData);
      setMessage({
        text: res.message || "Performance added successfully",
        type: "success",
      });

      setFormData({
        sid: sid || "",
        attendance_percentage: "",
        machine_test: "",
        mcq_test: "",
        mock_interview_score: "",
      });

      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || err.message || "Error adding performance",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perf-container">
      <div className="perf-card">
        {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}
        <h3 className="text-center">Add Student Performance</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Attendance (0-10)</label>
            <input type="number" name="attendance_percentage" value={formData.attendance_percentage}
              onChange={handleChange} className="form-control"
              min="0" max="10" required/>
            <span id="attendance_percentage_err"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Machine Test (0-10)</label>
            <input type="number" name="machine_test" value={formData.machine_test}
              onChange={handleChange} className="form-control" min="0" max="10" required/>
            <span id="machine_test_err"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">MCQ Test (0-10)</label>
            <input type="number" name="mcq_test" value={formData.mcq_test}
              onChange={handleChange} className="form-control" min="0" max="10" required/>
            <span id="mcq_test_err"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Mock Interview (0-10)</label>
            <input type="number" name="mock_interview_score" value={formData.mock_interview_score}
              onChange={handleChange} className="form-control" min="0" max="10" required/>
            <span id="mock_interview_score_err"></span>
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3"
            disabled={loading}> {loading ? "Submitting..." : "Add Performance"}
          </button>
           <button type="button" className="btn btn-secondary w-100"
            onClick={() => navigate("/admin/dashboard/performance/students")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePerformance, getPerformanceBySid } from "../services/PerformanceService";
import "./PerformanceUpdate.css";

export default function PerformanceUpdate() {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerformanceBySid(sid  );
        if (data) {
          setFormData({
            sid: data.sid,
            attendance_percentage: data.attendance_percentage || "",
            machine_test: data.machine_test || "",
            mcq_test: data.mcq_test || "",
            mock_interview_score: data.mock_interview_score || "",
          });
        }
      } catch (err) {
        console.error("Error fetching student performance:", err);
      }
    };
    fetchData();
  }, [sid]);

  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    });
    setMessage({ text: "", type: "" });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await updatePerformance(formData);
      setMessage({
        text: res.message || "Performance updated successfully",
        type: "success",
      });

      setTimeout(() => navigate("/admin/dashboard/performance/view"), 1000);

    } catch (err) {
      setMessage({
        text: err.message || "Error updating performance",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perf-container">
      <div className="perf-card">
        {message.text && (
          <div className={`alert ${message.type}`}>{message.text}</div>
        )}

        <h3 className="text-center mb-3">Update Student Performance</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Attendance (0-10)</label>
            <input
              type="number"
              name="attendance_percentage"
              value={formData.attendance_percentage}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="10"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Machine Test (0-10)</label>
            <input
              type="number"
              name="machine_test"
              value={formData.machine_test}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="10"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">MCQ Test (0-10)</label>
            <input
              type="number"
              name="mcq_test"
              value={formData.mcq_test}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="10"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mock Interview (0-10)</label>
            <input
              type="number"
              name="mock_interview_score"
              value={formData.mock_interview_score}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="10"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Performance"}
          </button>

  
        </form>
      </div>
    </div>
  );
}

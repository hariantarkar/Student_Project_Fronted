import React, { useEffect, useState } from "react";
import { getLatestPrediction } from "../services/PredictionService";

export default function LatestPrediction() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchPrediction = async () => {
    try {
      const res = await getLatestPrediction();
      if (res.success) setPrediction(res.data);
      else setError("No prediction found");
    } catch (err) {
      setError(err.message || "Failed to fetch prediction");
    }
  };
  fetchPrediction();
}, []);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!prediction) return <div className="text-center">Loading prediction...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Latest Prediction</h3>
      <div className="card p-3 shadow">
        <p>
          <strong>Predicted At:</strong> {new Date(prediction.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Readiness Level:</strong> {prediction.readiness_level}
        </p>
        <p>
          <strong>Shortlisted:</strong>{" "}
          {prediction.shortlisted
            ? "You Are Eligible For Placement"
            : "You Are Not Eligible For Placement"}
        </p>
        <p>
          <strong>Suggestion:</strong> {prediction.suggestion}
        </p>
      </div>
    </div>
  );
}

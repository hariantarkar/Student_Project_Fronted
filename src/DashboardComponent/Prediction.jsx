// import React from "react";

// export default function Prediction() {
//   return (
//     <div>
//       <h2>Prediction Result</h2>
//       <p>Your predicted performance will appear here.</p>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { getLatestPrediction } from "../services/predictionService";

export default function LatestPrediction({ sid }) {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sid) return;
    const fetchPrediction = async () => {
      try {
        const data = await getLatestPrediction(sid);
        setPrediction(data);
      } catch (err) {
        setError(err.error || "Failed to load prediction");
      }
    };
    fetchPrediction();
  }, [sid]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!prediction) return <p>Loading latest prediction...</p>;

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Latest Prediction</h5>
      <p><strong>Name:</strong> {prediction.name}</p>
      <p><strong>Email:</strong> {prediction.email}</p>
      <p><strong>Readiness Level:</strong> {prediction.readiness_level}</p>
      <p><strong>Shortlisted:</strong> {prediction.shortlisted ? "Yes" : "No"}</p>
      <p><strong>Suggestion:</strong> {prediction.suggestion}</p>
      <p><small>Generated At: {new Date(prediction.created_at).toLocaleString()}</small></p>
    </div>
  );
}

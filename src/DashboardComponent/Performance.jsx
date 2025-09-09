import React, { useEffect, useState } from "react";
import { getStudentPerformance } from "../services/PerformanceService";
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer,} from "recharts";

export default function Performance() {
  const [performances, setPerformances] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const COLORS = ["#1767ae", "#204a43", "#d24545", "#FF8042"];

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const data = await getStudentPerformance();

        if (!data || data.length === 0) {
          setError("No performance data found");
        } else {
          setPerformances(data);
          setSelected(data[0]); 
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Error fetching performance data");
      }
    };

    fetchPerformance();
  }, []);

  if (error) return <p className="text-danger text-center">{error}</p>;
  if (performances.length === 0 || !selected)
    return <p className="text-center">Loading...</p>;


  

  const chartDataRaw = [
    { name: "Attendance", value: Number(selected.attendance_percentage) || 0 },
    { name: "Machine Test", value: Number(selected.machine_test) || 0 },
    { name: "MCQ Test", value: Number(selected.mcq_test) || 0 },
    { name: "Mock Interview", value: Number(selected.mock_interview_score) || 0 },
  ];

  const total = chartDataRaw.reduce((sum, entry) => sum + entry.value, 0);


 

  const chartDataPercentage = chartDataRaw.map((entry) => ({
    name: entry.name,
    value: total > 0 ? Number(((entry.value / total) * 100).toFixed(1)) : 0,
  }));

  const formattedDate = new Date(selected.created_at).toLocaleString("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Your Performance
        <small className="text-muted ms-2">{formattedDate}</small>
      </h3>


      <div className="mb-4 text-center">
        <label className="me-2 fw-bold">Select Attempt:</label>
        <select className="form-select d-inline-block w-auto" value={selected.per_id}
          onChange={(e) => setSelected(
              performances.find((p) => p.per_id === Number(e.target.value)))
          }>
          {performances.map((p, idx) => (
            <option key={p.per_id} value={p.per_id}>
              Attempt {idx + 1} ({new Date(p.created_at).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      <div className="row">

      

        <div className="col-md-8">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartDataPercentage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={130}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {chartDataPercentage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>


        <div className="col-md-4 d-flex flex-column justify-content-center">
          <div className="card shadow-sm p-3">
            <h5 className="fw-bold mb-3">Marks Summary</h5>
            <p><strong>Attendance:</strong> {selected.attendance_percentage}/10</p>
            <p><strong>Machine Test:</strong> {selected.machine_test}/10</p>
            <p><strong>MCQ Test:</strong> {selected.mcq_test}/10</p>
            <p><strong>Mock Interview:</strong> {selected.mock_interview_score}/10</p>
            <hr />
            <p><strong>Final Score:</strong> {selected.final_score}/40</p>
            <p><strong>Percentage:</strong> {selected.percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

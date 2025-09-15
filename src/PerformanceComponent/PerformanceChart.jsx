import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPerformance } from "../services/PerformanceService";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";

export default function PerformanceChart() {
  const { sid } = useParams();
  const [performances, setPerformances] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const COLORS = ["#1767ae", "#204a43", "#d24545", "#FF8042"];

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const allData = await getAllPerformance();
        const studentData = allData.filter((p) => p.sid === Number(sid));

        if (!studentData || studentData.length === 0) {
          setError("No performance data found for this student");
        } else {
          setPerformances(studentData);
          setSelected(studentData[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching performance data");
      }
    };

    fetchPerformance();
  }, [sid]);

  if (error) return <p className="text-danger text-center">{error}</p>;
  if (performances.length === 0 || !selected)
    return <p className="text-center">Loading...</p>;

  const chartData = [
    { name: "Attendance", value: Number(selected.attendance_percentage) || 0 },
    { name: "Machine Test", value: Number(selected.machine_test) || 0 },
    { name: "MCQ Test", value: Number(selected.mcq_test) || 0 },
    { name: "Mock Interview", value: Number(selected.mock_interview_score) || 0 },
  ];

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
  const formattedDate = new Date(selected.created_at).toLocaleString("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="container mt-3 text-center">
      <h3>{selected.name} - Performance
        <small className="text-muted" style={{ marginLeft: "10px" }}>{formattedDate}</small>
      </h3>

      <div className="mb-3">
        <label className="me-2 fw-bold">Select Attempt:</label>
        <select value={selected.per_id} onChange={(e) => setSelected(
          performances.find((p) => p.per_id === Number(e.target.value)))}>

          {performances.map((p, index) => (
            <option key={p.per_id} value={p.per_id}>
              Attempt {index + 1} ({new Date(p.created_at).toLocaleDateString()})
            </option>
          ))}
        </select>

      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={120}
            dataKey="value"
            labelLine={false} 
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) / 2;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              const percentage = total ? ((chartData[index].value / total) * 100).toFixed(2) : 0;
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={12}>
                  {`${percentage}%`}
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${total ? ((value / total) * 100).toFixed(2) : 0}%`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}
